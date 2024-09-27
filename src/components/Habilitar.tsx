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
export default function Habilitar({
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
      method: 'PATCH',
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
          <DialogTitle>Habilitar</DialogTitle>
          <DialogDescription>
            Esta seguro de habilitar este elemento?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>

          <Button variant="default" type="button" onClick={deleteFuction}>
            Habilitar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
