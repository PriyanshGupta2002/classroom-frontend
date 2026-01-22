import { subject } from "@/types";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const subjectsMock: subject[] = [
  {
    id: 1,
    code: "CSE101",
    name: "Programming Fundamentals",
    description:
      "Basics of problem solving, variables, control flow, and functions using a modern language.",
    department: "Computer Science",
    createdAt: "2026-01-10T09:30:00.000Z",
  },
  {
    id: 2,
    code: "CSE102",
    name: "Data Structures",
    description:
      "Arrays, linked lists, stacks, queues, trees, hashing, and complexity analysis.",
    department: "Computer Science",
    createdAt: "2026-01-11T10:15:00.000Z",
  },
  {
    id: 3,
    code: "IT201",
    name: "Database Management Systems",
    description:
      "Relational modeling, SQL, normalization, indexing, transactions, and basic design patterns.",
    department: "Information Technology",
    createdAt: "2026-01-12T08:45:00.000Z",
  },
  {
    id: 4,
    code: "CSE202",
    name: "Operating Systems",
    description:
      "Processes, threads, scheduling, memory management, file systems, and concurrency basics.",
    department: "Computer Science",
    createdAt: "2026-01-13T11:00:00.000Z",
  },
  {
    id: 5,
    code: "IT205",
    name: "Computer Networks",
    description:
      "OSI/TCP-IP layers, routing, switching, DNS/HTTP, and network troubleshooting fundamentals.",
    department: "Information Technology",
    createdAt: "2026-01-14T07:20:00.000Z",
  },
  {
    id: 6,
    code: "CSE210",
    name: "Software Engineering",
    description:
      "SDLC, requirements, UML, design principles, testing strategies, and agile methodologies.",
    department: "Computer Science",
    createdAt: "2026-01-15T12:10:00.000Z",
  },
  {
    id: 7,
    code: "IT310",
    name: "Web Development",
    description:
      "Frontend and backend fundamentals, REST APIs, authentication, and deployment basics.",
    department: "Information Technology",
    createdAt: "2026-01-16T06:55:00.000Z",
  },
  {
    id: 8,
    code: "IT320",
    name: "Cloud Computing",
    description:
      "Cloud concepts, virtualization, containers, scaling, monitoring, and cloud security basics.",
    department: "Information Technology",
    createdAt: "2026-01-17T09:05:00.000Z",
  },
  {
    id: 9,
    code: "MGT101",
    name: "Business Analytics",
    description:
      "Data-driven decision making, KPI design, descriptive analytics, and visualization basics.",
    department: "Management",
    createdAt: "2026-01-18T10:40:00.000Z",
  },
  {
    id: 10,
    code: "SEC110",
    name: "Cybersecurity Fundamentals",
    description:
      "Threats, vulnerabilities, encryption basics, identity/access management, and best practices.",
    department: "Information Security",
    createdAt: "2026-01-19T08:25:00.000Z",
  },
];
