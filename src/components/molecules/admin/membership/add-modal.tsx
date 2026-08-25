"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BaseInput } from "@/src/components/atoms/input";
import { BaseButton } from "@/src/components/atoms/button";
import { Button } from "@/components/ui/button";
import { useManageMembershipModal } from "@/src/store/admin/membership/modal";
import { ICreateMembership } from "@/src/interfaces/admin/membership/create";
import { useCreateMembershipMutation } from "@/src/services/mutation/admin/membership";
import { useState, useEffect, useCallback } from "react";
import { useShallow } from "zustand/shallow";
import toast from "react-hot-toast";

const AddMembershipModal = () => {
  const { openedMembership, setOpenedMembership } = useManageMembershipModal(
    useShallow((state) => ({
      openedMembership: state.openedMembership,
      setOpenedMembership: state.setOpenedMembership,
    }))
  );

  const { mutate: createMembership, isPending } = useCreateMembershipMutation();

  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<ICreateMembership>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (openedMembership) {
      setFormData({
        first_name: openedMembership.users?.first_name || "",
        last_name: openedMembership.users?.last_name || "",
        email: openedMembership.users?.email || "",
        phone: openedMembership.users?.phone || "",
      });
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      });
    }
  }, [openedMembership]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMembership(formData, {
      onSuccess: () => {
        toast.success("Membership created successfully!");
        setOpenedMembership(null);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
        });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create membership");
      },
    });
  };

  const handleClose = useCallback(() => {
    setOpenedMembership(null);
  }, [setOpenedMembership]);

  if (!mounted) return null;

  const isOpen = openedMembership !== null;
  const isEdit = openedMembership?.id !== undefined;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit Membership" : "Add New Membership"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Update the membership details below."
                : "Fill in the details to create a new membership."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="first_name" className="text-sm font-medium">
                  First Name
                </label>
                <BaseInput
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="last_name" className="text-sm font-medium">
                  Last Name
                </label>
                <BaseInput
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter last name (optional)"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <BaseInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <BaseInput
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" onClick={handleClose} disabled={isPending}>
              Cancel
            </Button>
            <BaseButton type="submit" disabled={isPending}>
              {isPending
                ? "Creating..."
                : isEdit
                ? "Update Membership"
                : "Create Membership"}
            </BaseButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMembershipModal;
