export type FilterOperator = "contains" | "is" | "is-not" | "gt" | "lt" | "between" | "in";
export type FilterValue = string | readonly string[];
export type FilterRule = { id: string; field: string; operator: FilterOperator; value: FilterValue };
export type FilterQuery = { id: string; combinator: "and" | "or"; rules: readonly (FilterRule | FilterQuery)[] };
export type FilterField = { id: string; label: string; path?: readonly string[] } & (
  | { type: "text" | "number" | "date" | "date-range" | "boolean" }
  | { type: "select" | "multi-select"; options: readonly { value: string; label: string; avatar?: string }[] }
);

/** Evaluate structured rules without mutating the record or query. */
export function matchesFilterQuery(
  record: Record<string, unknown>,
  query: FilterQuery,
  fields: readonly FilterField[] = [],
): boolean {
  if (!query.rules.length) return query.combinator === "and";
  const matches = (rule: FilterRule | FilterQuery): boolean => {
    if ("rules" in rule) return matchesFilterQuery(record, rule, fields);
    const field = fields.find((item) => item.id === rule.field);
    const path = field?.path ?? [rule.field];
    const raw = path.reduce<unknown>((current, key) => {
      if (typeof current !== "object" || current === null || !Object.hasOwn(current, key)) return undefined;
      return (current as Record<string, unknown>)[key];
    }, record);
    if (raw === undefined || raw === null) return false;
    const value = String(raw).toLocaleLowerCase();
    const values = typeof rule.value === "string" ? [rule.value.toLocaleLowerCase()] : rule.value.map((item) => item.toLocaleLowerCase());
    const expected = values[0] ?? "";
    switch (rule.operator) {
      case "contains": return value.includes(expected);
      case "is": return value === expected;
      case "is-not": return value !== expected;
      case "gt": return value.trim() !== "" && expected.trim() !== "" && Number(value) > Number(expected);
      case "lt": return value.trim() !== "" && expected.trim() !== "" && Number(value) < Number(expected);
      case "in": return Array.isArray(raw)
        ? raw.some((item) => values.includes(String(item).toLocaleLowerCase()))
        : values.includes(value);
      case "between": {
        const last = values[1];
        if (!value || !expected || !last) return false;
        const numeric = [value, expected, last].every((item) => Number.isFinite(Number(item)));
        return numeric ? Number(value) >= Number(expected) && Number(value) <= Number(last) : value >= expected && value <= last;
      }
    }
  };
  return query.combinator === "and" ? query.rules.every(matches) : query.rules.some(matches);
}
