"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getInitials } from "@/lib/utils";
import { suspendUser, updateUserRole } from "@/lib/admin/actions/user";
import Image from "next/image";

export type AdminUserRow = {
  id: string;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN";
  status: "PENDING" | "APPROVED" | "SUSPENDED";
  universityId: number;
  universityCard: string;
  createdAt: string | null;
  booksBorrowed: number;
};

export default function AdminUsersTable({ users }: { users: AdminUserRow[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const formatDate = (iso: string | null) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const onChangeRole = async (userId: string, role: "USER" | "ADMIN") => {
    try {
      setLoadingId(userId);
      const res = await updateUserRole(userId, role);
      if (!res.success) {
        toast.error("Role update failed", { description: res.error });
        return;
      }
      toast.success("Role updated");
      router.refresh();
    } catch (e: any) {
      toast.error("Role update failed", { description: e?.message ?? "Error" });
    } finally {
      setLoadingId(null);
    }
  };

  const onSuspend = async (userId: string) => {
    try {
      setLoadingId(userId);
      const res = await suspendUser(userId);
      if (!res.success) {
        toast.error("Action failed", { description: res.error });
        return;
      }
      toast.success("User suspended");
      router.refresh();
    } catch (e: any) {
      toast.error("Action failed", { description: e?.message ?? "Error" });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full rounded-xl border border-slate-100 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-white">
            <TableHead className="text-slate-500">Name</TableHead>
            <TableHead className="text-slate-500 hidden md:table-cell">
              Date Joined
            </TableHead>
            <TableHead className="text-slate-500">Role</TableHead>
            <TableHead className="text-slate-500 hidden lg:table-cell">
              Books Borrowed
            </TableHead>
            <TableHead className="text-slate-500 hidden lg:table-cell">
              University ID No
            </TableHead>
            <TableHead className="text-slate-500 hidden md:table-cell">
              University ID Card
            </TableHead>
            <TableHead className="text-slate-500 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id} className="border-t border-slate-100">
              {/* Name */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-light-300 text-dark-200">
                      {getInitials(u.fullName || "NN")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="font-semibold text-dark-400 line-clamp-1">
                      {u.fullName}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {u.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Date Joined */}
              <TableCell className="hidden md:table-cell text-slate-500">
                {formatDate(u.createdAt)}
              </TableCell>

              {/* Role */}
              <TableCell>
                <Select
                  value={u.role}
                  onValueChange={(v) =>
                    onChangeRole(u.id, v as "USER" | "ADMIN")
                  }
                  disabled={loadingId === u.id}
                >
                  <SelectTrigger className="h-9 w-[110px] rounded-full border-slate-200 bg-slate-50 text-xs font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>

              {/* Books Borrowed */}
              <TableCell className="hidden lg:table-cell text-slate-500">
                {u.booksBorrowed}
              </TableCell>

              {/* University ID */}
              <TableCell className="hidden lg:table-cell text-slate-500">
                {u.universityId}
              </TableCell>

              {/* University ID Card */}
              <TableCell className="hidden md:table-cell">
                <a
                  href={u.universityCard}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-primary-admin text-sm font-semibold hover:opacity-80"
                >
                  <span>View ID Card</span>
                  <Image
                    src="/icons/admin/external-link.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="opacity-80"
                  />
                </a>
              </TableCell>

              {/* Action */}
              <TableCell className="text-right">
                <button
                  type="button"
                  onClick={() => onSuspend(u.id)}
                  disabled={loadingId === u.id}
                  className="inline-flex items-center justify-center rounded-md p-2 text-red-500 hover:bg-red-50 disabled:opacity-50"
                  aria-label="Suspend user"
                  title="Suspend user"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}

          {!users.length && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-10 text-center text-slate-500"
              >
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Mobile helper */}
      <div className="p-4 text-xs text-slate-400 md:hidden">
        Tip: swipe horizontally to see more columns.
      </div>
    </div>
  );
}
