import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PogsCreationForm } from "./pogsCreateForm";

export default function CreatePogsButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Pogs</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Pogs</DialogTitle>
          <DialogDescription>
            Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <PogsCreationForm />
      </DialogContent>
    </Dialog>
  );
}
