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
import { Textarea } from "@/components/ui/textarea";
import { useManageTiersModal } from "@/src/store/admin/tiers/modal";
import { ICreateTier } from "@/src/interfaces/admin/tiers/create";
import { useCreateTierMutation } from "@/src/services/mutation/admin/tiers";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const AddTierModal = () => {
  const { openedTiers, setOpenedTiers } = useManageTiersModal();
  const { mutate: createTier, isPending } = useCreateTierMutation();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<ICreateTier>({
    name: "",
    description: "",
    level: 0,
    required_points: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (openedTiers) {
      setFormData({
        name: openedTiers.name,
        description: openedTiers.description || "",
        level: openedTiers.level,
        required_points: openedTiers.required_points,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        level: 0,
        required_points: 0,
      });
    }
  }, [openedTiers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTier(formData, {
      onSuccess: () => {
        toast.success("Tier created successfully!");
        setOpenedTiers(null);
        setFormData({
          name: "",
          description: "",
          level: 0,
          required_points: 0,
        });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create tier");
      },
    });
  };

  const handleClose = useCallback(() => {
    setOpenedTiers(null);
  }, [setOpenedTiers]);

  if (!mounted) return null;

  const isOpen = openedTiers !== null;
  const isEdit = openedTiers?.id !== undefined;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Tier" : "Add New Tier"}</DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Update the tier details below."
                : "Fill in the details to create a new membership tier."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <BaseInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter tier name"
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter tier description (optional)"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="level" className="text-sm font-medium">
                  Level
                </label>
                <BaseInput
                  id="level"
                  name="level"
                  type="number"
                  min={0}
                  value={formData.level}
                  onChange={handleChange}
                  placeholder="0"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="required_points"
                  className="text-sm font-medium"
                >
                  Required Points
                </label>
                <BaseInput
                  id="required_points"
                  name="required_points"
                  type="number"
                  min={0}
                  value={formData.required_points}
                  onChange={handleChange}
                  placeholder="0"
                  required
                />
              </div>
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
                ? "Update Tier"
                : "Create Tier"}
            </BaseButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTierModal;
