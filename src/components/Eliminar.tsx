'use client'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Eliminar({
  children,
  url,
}: {
  children: JSX.Element
  url: string
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const deleteFuction = async () => {
    const response = await fetch(url, {
      method: 'DELETE',
    })

    if (response.status >= 400) {
      // Devolvemos un error que puede ser manejado
      return
    }
    setOpen(false)
    router.refresh()
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Eliminar</DialogTitle>
          <DialogDescription>
            Esta seguro de eliminar este elemento?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>

          <Button variant="destructive" type="button" onClick={deleteFuction}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
