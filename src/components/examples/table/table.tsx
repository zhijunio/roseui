"use client";

import { useEffect, useRef, useState } from "react";

import { Star } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Autocomplete } from "@/components/roseui/autocomplete";
import { Spinner } from "@/components/roseui/spinner";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/roseui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Key = string | number;
type Selection = Set<string | number> | "all";

const initialProjects = [
  { id: "atlas", name: "Atlas redesign", owner: "Maya Chen", status: "In progress", updated: "Today" },
  { id: "mobile", name: "Mobile onboarding", owner: "Leo Park", status: "In review", updated: "Yesterday" },
  { id: "billing", name: "Billing portal", owner: "Nina Patel", status: "Planned", updated: "Nov 10" },
  { id: "analytics", name: "Analytics dashboard", owner: "Omar Ali", status: "In progress", updated: "Nov 9" },
  { id: "docs", name: "Developer docs", owner: "Eva Martin", status: "Complete", updated: "Nov 8" },
];

const users = [
  {
    id: "1",
    name: "Justice Larkin",
    email: "justice.larkin@example.com",
    role: "Admin",
    status: "Active",
    joined: "2022-01-15",
  },
  {
    id: "2",
    name: "Megan Smith",
    email: "megan.smith@example.com",
    role: "Editor",
    status: "Active",
    joined: "2022-03-12",
  },
  {
    id: "3",
    name: "Daniel Wu",
    email: "daniel.wu@example.com",
    role: "Viewer",
    status: "Inactive",
    joined: "2022-04-08",
  },
  {
    id: "4",
    name: "Sophia Hernandez",
    email: "sophia.hernandez@example.com",
    role: "Admin",
    status: "Active",
    joined: "2022-05-25",
  },
  {
    id: "5",
    name: "Liam Johnson",
    email: "liam.johnson@example.com",
    role: "Editor",
    status: "Suspended",
    joined: "2022-06-14",
  },
  {
    id: "6",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    role: "Viewer",
    status: "Active",
    joined: "2022-07-09",
  },
  {
    id: "7",
    name: "Noah Miller",
    email: "noah.miller@example.com",
    role: "Admin",
    status: "Active",
    joined: "2022-08-02",
  },
  {
    id: "8",
    name: "Ava Wilson",
    email: "ava.wilson@example.com",
    role: "Editor",
    status: "Inactive",
    joined: "2022-09-19",
  },
  {
    id: "9",
    name: "Ethan Davis",
    email: "ethan.davis@example.com",
    role: "Viewer",
    status: "Active",
    joined: "2022-10-21",
  },
  {
    id: "10",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    role: "Editor",
    status: "Active",
    joined: "2022-11-30",
  },
];

const books = [
  { id: "1", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", publishedYear: 1960 },
  { id: "2", title: "1984", author: "George Orwell", genre: "Dystopian", publishedYear: 1949 },
  { id: "3", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", publishedYear: 1925 },
  { id: "4", title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", publishedYear: 1951 },
  { id: "5", title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", publishedYear: 1813 },
  { id: "6", title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", publishedYear: 1954 },
  {
    id: "7",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    publishedYear: 1997,
  },
];

const movies = [
  { id: "1", name: "The Matrix", genre: "Sci-Fi", releaseYear: 1999, rating: 8.7 },
  { id: "2", name: "Inception", genre: "Sci-Fi", releaseYear: 2010, rating: 8.8 },
  { id: "3", name: "The Godfather", genre: "Crime", releaseYear: 1972, rating: 9.2 },
  { id: "4", name: "Pulp Fiction", genre: "Crime", releaseYear: 1994, rating: 8.9 },
  { id: "5", name: "The Dark Knight", genre: "Action", releaseYear: 2008, rating: 9 },
  { id: "6", name: "Fight Club", genre: "Drama", releaseYear: 1999, rating: 8.8 },
  { id: "7", name: "Forrest Gump", genre: "Drama", releaseYear: 1994, rating: 8.8 },
];

const vocalists = [
  {
    id: "1",
    name: "Randy Blythe",
    email: "randy.blythe@example.com",
    age: 52,
    role: "Vocalist",
    band: "Lamb of God",
    status: "Active",
  },
  {
    id: "2",
    name: "Phil Anselmo",
    email: "phil.anselmo@example.com",
    age: 55,
    role: "Vocalist",
    band: "Pantera",
    status: "Active",
  },
  {
    id: "3",
    name: "George Fisher",
    email: "george.fisher@example.com",
    age: 53,
    role: "Vocalist",
    band: "Cannibal Corpse",
    status: "Active",
  },
  {
    id: "4",
    name: "Corey Taylor",
    email: "corey.taylor@example.com",
    age: 50,
    role: "Vocalist",
    band: "Slipknot",
    status: "Active",
  },
  {
    id: "5",
    name: "Trevor Strnad",
    email: "trevor.strnad@example.com",
    age: 41,
    role: "Vocalist",
    band: "The Black Dahlia Murder",
    status: "Inactive",
  },
  {
    id: "6",
    name: "Chuck Schuldiner",
    email: "chuck.schuldiner@example.com",
    age: 34,
    role: "Vocalist",
    band: "Death",
    status: "Deceased",
  },
  {
    id: "7",
    name: "Mitch Lucker",
    email: "mitch.lucker@example.com",
    age: 28,
    role: "Vocalist",
    band: "Suicide Silence",
    status: "Deceased",
  },
];

const films = [
  {
    id: "a-new-hope",
    title: "A New Hope",
    director: "George Lucas",
    producer: "Gary Kurtz",
    release_date: "1977-05-25",
  },
  {
    id: "empire",
    title: "The Empire Strikes Back",
    director: "Irvin Kershner",
    producer: "Gary Kurtz",
    release_date: "1980-05-17",
  },
  {
    id: "jedi",
    title: "Return of the Jedi",
    director: "Richard Marquand",
    producer: "Howard G. Kazanjian",
    release_date: "1983-05-25",
  },
  {
    id: "phantom",
    title: "The Phantom Menace",
    director: "George Lucas",
    producer: "Rick McCallum",
    release_date: "1999-05-19",
  },
  {
    id: "clones",
    title: "Attack of the Clones",
    director: "George Lucas",
    producer: "Rick McCallum",
    release_date: "2002-05-16",
  },
];

const loadableProjects = Array.from({ length: 24 }, (_, index) => ({
  id: `project-${index + 1}`,
  name: ["Atlas redesign", "Mobile onboarding", "Billing portal", "Analytics dashboard"][index % 4],
  owner: ["Maya Chen", "Leo Park", "Nina Patel", "Omar Ali"][index % 4],
  status: ["In progress", "In review", "Planned", "Complete"][index % 4],
  updated: `Nov ${13 - (index % 13)}`,
}));

function ProjectStatus({ status }: { status: string }) {
  const variant = status === "Complete" ? "default" : status === "In progress" ? "secondary" : "outline";
  return <Badge variant={variant}>{status}</Badge>;
}

function SearchableTableExample() {
  const [query, setQuery] = useState("");
  const searchableUsers = users.map((user) => ({
    value: user.name,
    description: `${user.email} · ${user.role}`,
  }));
  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.role} ${user.status} ${user.joined}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-3">
      <Autocomplete
        aria-label="Search users"
        items={searchableUsers}
        placeholder="Search users"
        value={query}
        onValueChange={setQuery}
        onSelect={(item) => setQuery(item.value)}
        emptyText="No matching users."
        clearable
        showTrigger
      />
      <Table aria-label="Searchable users">
        <TableHeader>
          <TableColumn className="w-0">#</TableColumn>
          <TableColumn isRowHeader>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Joined</TableColumn>
        </TableHeader>
        <TableBody
          items={filteredUsers}
          renderEmptyState={() => (
            <div className="text-muted-foreground px-4 py-6 text-center text-sm">No users match this search.</div>
          )}
        >
          {(user) => (
            <TableRow id={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.joined}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <p className="text-muted-foreground text-xs" aria-live="polite">
        {filteredUsers.length} of {users.length} users
      </p>
    </div>
  );
}

type ProjectTreeNode = {
  id: string;
  name: string;
  owner: string;
  status: string;
  children: ProjectTreeNode[];
  detail?: string;
};

const nestedProjects: ProjectTreeNode[] = [
  {
    id: "design",
    name: "Design system",
    owner: "Maya Chen",
    status: "In progress",
    children: [
      {
        id: "design-details",
        name: "Project details",
        owner: "",
        status: "",
        detail: "The shared component library is in review. The team is documenting usage and accessibility patterns.",
        children: [],
      },
    ],
  },
  {
    id: "website",
    name: "Website redesign",
    owner: "Nina Patel",
    status: "In progress",
    children: [
      {
        id: "website-details",
        name: "Project details",
        owner: "",
        status: "",
        detail: "The new site is being rebuilt around the product catalog and customer stories.",
        children: [],
      },
    ],
  },
];

function ExpandableRowsExample() {
  const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(new Set(["design"]));
  const visibleProjects = nestedProjects.flatMap((project) => [
    project,
    ...(expandedKeys.has(project.id) ? project.children : []),
  ]);

  return (
    <Table aria-label="Projects with expandable details">
      <TableHeader>
        <TableColumn id="name" isRowHeader>
          Project
        </TableColumn>
        <TableColumn>Owner</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody items={visibleProjects}>
        {(project) =>
          project.detail ? (
            <TableRow key={project.id} id={project.id}>
              <TableCell colSpan={3}>
                <div className="space-y-1 py-1">
                  <p className="text-foreground text-sm font-medium">Additional details</p>
                  <p className="text-muted-foreground text-sm whitespace-normal">{project.detail}</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow
              key={project.id}
              id={project.id}
              onClick={() =>
                setExpandedKeys((current) => {
                  const next = new Set(current);
                  if (next.has(project.id)) next.delete(project.id);
                  else next.add(project.id);
                  return next;
                })
              }
            >
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.owner}</TableCell>
              <TableCell>
                <ProjectStatus status={project.status} />
              </TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  );
}

function BulkActionsExample() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const selectedIds = selectedKeys === "all" ? books.map((book) => book.id) : [...selectedKeys].map(String);

  return (
    <div className="space-y-2">
      <Table
        aria-label="Books"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          <TableColumn className="w-0">#</TableColumn>
          <TableColumn isRowHeader>Title</TableColumn>
          <TableColumn>Author</TableColumn>
          <TableColumn>Genre</TableColumn>
          <TableColumn>Published</TableColumn>
        </TableHeader>
        <TableBody items={books}>
          {(book) => (
            <TableRow id={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell className="whitespace-nowrap">{book.title}</TableCell>
              <TableCell className="whitespace-nowrap">{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.publishedYear}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <p className="text-muted-foreground text-sm" aria-live="polite">
        {selectedIds.length > 0 ? (
          <>
            You have selected: <strong className="text-foreground">{selectedIds.join(", ")}</strong>
          </>
        ) : (
          "You have not selected anything."
        )}
      </p>
    </div>
  );
}

function DragAndDropExample() {
  const [items, setItems] = useState(movies);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const moveMovie = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;
    setItems((current) => {
      const sourceIndex = current.findIndex((movie) => movie.id === draggedId);
      const targetIndex = current.findIndex((movie) => movie.id === targetId);
      const next = [...current];
      const [moving] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, moving);
      return next;
    });
    setDraggedId(null);
  };

  return (
    <Table allowResize aria-label="Movies">
      <TableHeader>
        <TableColumn className="w-0">#</TableColumn>
        <TableColumn isRowHeader>Name</TableColumn>
        <TableColumn>Genre</TableColumn>
        <TableColumn>Release</TableColumn>
        <TableColumn>Rating</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(movie) => (
          <TableRow
            id={movie.id}
            draggable
            onDragStart={(event) => {
              setDraggedId(movie.id);
              event.dataTransfer.setData("text/plain", movie.id);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => moveMovie(movie.id)}
          >
            <TableCell>{movie.id}</TableCell>
            <TableCell>{movie.name}</TableCell>
            <TableCell>{movie.genre}</TableCell>
            <TableCell>{movie.releaseYear}</TableCell>
            <TableCell>
              <span className="flex items-center gap-2">
                <Star aria-hidden className="text-warning size-3.5 fill-current" />
                {movie.rating.toFixed(1)}
              </span>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

type Film = (typeof films)[number];

type FilmSortKey = "director" | "release_date";

function getFilmSortValue(film: Film, key: Key) {
  switch (key) {
    case "director":
      return film.director;
    case "release_date":
      return film.release_date;
    default:
      return "";
  }
}

function SortingExample() {
  const [sortDescriptor, setSortDescriptor] = useState<{ column: FilmSortKey; direction: "ascending" | "descending" }>({
    column: "director",
    direction: "ascending",
  });
  const sortedFilms = [...films].sort(
    (left, right) =>
      getFilmSortValue(left, sortDescriptor.column).localeCompare(getFilmSortValue(right, sortDescriptor.column)) *
      (sortDescriptor.direction === "ascending" ? 1 : -1),
  );
  const changeSort = (column: FilmSortKey) =>
    setSortDescriptor((current) => ({
      column,
      direction: current.column === column && current.direction === "ascending" ? "descending" : "ascending",
    }));

  return (
    <Table aria-label="Movies">
      <TableHeader>
        <TableColumn id="title" isRowHeader>
          Title
        </TableColumn>
        <TableColumn id="director" allowsSorting onClick={() => changeSort("director")}>
          Director
        </TableColumn>
        <TableColumn>Producer</TableColumn>
        <TableColumn id="release_date" allowsSorting onClick={() => changeSort("release_date")}>
          Release Date
        </TableColumn>
      </TableHeader>
      <TableBody
        items={sortedFilms}
        renderEmptyState={() => (
          <div className="flex justify-center p-6">
            <Spinner size="sm" label="Loading films" />
          </div>
        )}
      >
        {(film) => (
          <TableRow id={film.id}>
            <TableCell className="whitespace-nowrap">{film.title}</TableCell>
            <TableCell className="whitespace-nowrap">{film.director}</TableCell>
            <TableCell className="whitespace-nowrap">{film.producer}</TableCell>
            <TableCell>{film.release_date}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function ResizableExample() {
  return (
    <Table allowResize aria-label="Vocalists">
      <TableHeader>
        <TableColumn className="max-w-10">ID</TableColumn>
        <TableColumn isRowHeader isResizable>
          Name
        </TableColumn>
        <TableColumn isResizable>Email</TableColumn>
        <TableColumn>Age</TableColumn>
        <TableColumn>Role</TableColumn>
        <TableColumn isResizable>Band</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody items={vocalists}>
        {(vocalist) => (
          <TableRow id={vocalist.id}>
            <TableCell>{vocalist.id}</TableCell>
            <TableCell>{vocalist.name}</TableCell>
            <TableCell>{vocalist.email}</TableCell>
            <TableCell>{vocalist.age}</TableCell>
            <TableCell>{vocalist.role}</TableCell>
            <TableCell>{vocalist.band}</TableCell>
            <TableCell>{vocalist.status}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function InfiniteScrollingExample() {
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleProjects = loadableProjects.slice(0, visibleCount);
  const hasMore = visibleCount < loadableProjects.length;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scrollContainerRef.current;
    const target = loadMoreRef.current;
    if (!root || !target || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((current) => Math.min(loadableProjects.length, current + 6));
        }
      },
      { root, rootMargin: "0px 0px 80px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div ref={scrollContainerRef} className="max-h-72 overflow-auto">
      <Table aria-label="Projects loaded while scrolling">
        <TableHeader>
          <TableColumn isRowHeader>Project</TableColumn>
          <TableColumn>Owner</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody
          items={visibleProjects}
          renderEmptyState={() => (
            <div className="flex justify-center p-6">
              <Spinner size="sm" label="Loading projects" />
            </div>
          )}
        >
          {(project) => (
            <TableRow id={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.owner}</TableCell>
              <TableCell>
                <ProjectStatus status={project.status} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {hasMore && (
        <div ref={loadMoreRef} className="flex min-h-8 items-center justify-center" aria-live="polite">
          <Spinner size="sm" label="Loading more projects" />
        </div>
      )}
    </div>
  );
}

function LinkRowsExample() {
  return (
    <div className="space-y-3">
      <Table aria-label="Open a project">
        <TableHeader>
          <TableColumn isRowHeader>Project</TableColumn>
          <TableColumn>Owner</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody items={initialProjects.slice(0, 3)}>
          {(project) => (
            <TableRow id={project.id} href={`/docs/components/collections/table?project=${project.id}`}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.owner}</TableCell>
              <TableCell>
                <ProjectStatus status={project.status} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <p className="text-muted-foreground text-xs">
        Each row uses <code>href</code> for navigation; use <code>onAction</code> when navigation is handled in the
        client.
      </p>
    </div>
  );
}

function BleedExample() {
  return (
    <div className="w-full rounded-lg border p-4">
      <Table aria-label="Projects with bleed" bleed className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(4)]">
        <TableHeader>
          <TableColumn isRowHeader>Project</TableColumn>
          <TableColumn>Owner</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody items={initialProjects.slice(0, 3)}>
          {(project) => (
            <TableRow id={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.owner}</TableCell>
              <TableCell>
                <ProjectStatus status={project.status} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function WithCardExample() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent projects</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table aria-label="Recent projects" bleed className="[--gutter:var(--card-spacing)]">
          <TableHeader>
            <TableColumn isRowHeader>Project</TableColumn>
            <TableColumn>Owner</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody items={initialProjects.slice(0, 3)}>
            {(project) => (
              <TableRow id={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.owner}</TableCell>
                <TableCell>
                  <ProjectStatus status={project.status} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function TableExamples() {
  return (
    <div className="space-y-5">
      <ComponentPreview title="Search" layout="fullStack">
        <SearchableTableExample />
      </ComponentPreview>
      <ComponentPreview title="Expandable Rows" layout="fullStack">
        <ExpandableRowsExample />
      </ComponentPreview>
      <ComponentPreview title="Row Selection and Bulk Actions" layout="fullStack">
        <BulkActionsExample />
      </ComponentPreview>
      <ComponentPreview title="Row Reordering" layout="fullStack">
        <DragAndDropExample />
      </ComponentPreview>
      <ComponentPreview title="Column Sorting" layout="fullStack">
        <SortingExample />
      </ComponentPreview>
      <ComponentPreview title="Resizable Columns" layout="fullStack">
        <ResizableExample />
      </ComponentPreview>
      <ComponentPreview title="Infinite Scrolling" layout="fullStack">
        <InfiniteScrollingExample />
      </ComponentPreview>
      <ComponentPreview title="Linked Cells" layout="fullStack">
        <LinkRowsExample />
      </ComponentPreview>
      <ComponentPreview title="Edge-to-edge Layout" layout="fullStack">
        <BleedExample />
      </ComponentPreview>
      <ComponentPreview title="Card Container" layout="fullStack">
        <WithCardExample />
      </ComponentPreview>
    </div>
  );
}
