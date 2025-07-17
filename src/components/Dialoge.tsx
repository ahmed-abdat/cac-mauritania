import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import React from "react";

export default function Dialoge({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full h-full max-h-full flex items-center justify-center p-0 m-0 border-none text-white bg-transparent sm:text-black sm:bg-white sm:border">
        {children}
      </DialogContent>
    </Dialog>
  );
}
