import { useEffect, useState } from 'react'
import api from '@/api/axios'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Pencil, PlusCircle, Trash } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader } from '@/components/ui/loader'

type Department = {
  id: number
  name: string
}

function Departments() {
  const [data, setData] = useState<Department[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const columns: ColumnDef<Department>[] = [
    {
      header: 'Tartib raqami',
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: 'name',
      header: "Bo'lim nomi",
    },
    {
      header: 'Xodimlar soni',
      cell: () => {
        const randomCount = Math.floor(Math.random() * 100)
        return <span>{randomCount}</span>
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='block ml-auto'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedId(payment.id)
                  setName(payment.name)
                  setOpenUpdate(true)
                }}
              >
                <Pencil className='mr-1' />
                Bo'lim nomini o'zgartirish
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant='destructive'
                onClick={() => {
                  setDeleteId(payment.id)
                  setOpenDelete(true)
                }}
              >
                <Trash className='mr-1' /> Bo'limni o'chirish
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(true)
      try {
        const res = await api.get('/user/departments/')
        setData(res.data)
      } catch (error) {
        toast.error('Qandaydir xatolik yuz berdi. Iltimos, sahifani yangilang')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDepartments()
  }, [])

  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error("Bo'lim nomi bo'sh bo'lmasligi kerak")
      return
    }
    setIsLoading(true)
    try {
      const res = await api.post('/user/departments/', { name })
      if (res.status === 201) {
        setData((prev) => [...prev, res.data])
        setName('')
        toast.success("Bo'lim muvaffaqiyatli qo'shildi")
        setOpenAdd(false)
      } else {
        toast.error("Bo'lim qo'shishda xatolik yuz berdi")
      }
    } catch (error) {
      toast.error("Bo'lim qo'shishda xatolik yuz berdi")
      console.error('Error creating department:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (deleteId === null) return
    setIsLoading(true)
    try {
      const res = await api.delete(`/user/departments/${deleteId}/`)
      if (res.status === 204) {
        setData((prev) => prev.filter((dept) => dept.id !== deleteId))
        setDeleteId(null)
        setOpenDelete(false)
        toast.success("Bo'lim muvaffaqiyatli o'chirildi")
      } else {
        toast.error("Bo'limni o'chirishda xatolik yuz berdi")
      }
    } catch (error) {
      toast.error("Bo'limni o'chirishda xatolik yuz berdi")
      console.error('Error deleting department:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateDepartment = async () => {
    if (!name.trim() || selectedId === null) {
      toast.error("Bo'lim nomi bo'sh bo'lmasligi kerak")
      return
    }
    setIsLoading(true)
    try {
      const res = await api.put(`/user/departments/${selectedId}/`, { name })
      if (res.status === 200) {
        setData((prev) =>
          prev.map((dept) =>
            dept.id === selectedId ? { ...dept, name: res.data.name } : dept
          )
        )
        setName('')
        setSelectedId(null)
        toast.success("Bo'lim nomi muvaffaqiyatli yangilandi")
        setOpenUpdate(false)
      } else {
        toast.error("Bo'lim nomini yangilashda xatolik yuz berdi")
      }
    } catch (error) {
      toast.error("Bo'lim nomini yangilashda xatolik yuz berdi")
      console.error('Error updating department:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='p-4'>
      <div className='mb-4 flex justify-end items-center'>
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <form>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle />
                Bo'lim qo'shish
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Yangi bo'lim qo'shish</DialogTitle>
                <DialogDescription>Bo'lim nomini kiriting</DialogDescription>
              </DialogHeader>
              <div className='grid gap-4'>
                <div className='grid gap-3'>
                  <Label htmlFor='name'>Bo'lim nomi</Label>
                  <Input
                    id='name'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant='outline'>Bekor qilish</Button>
                </DialogClose>
                <Button
                  disabled={isLoading}
                  type='submit'
                  onClick={handleCreateDepartment}
                >
                  {isLoading ? (
                    <>
                      <Loader size='sm' /> Bo'lim saqlanmoqda
                    </>
                  ) : (
                    `Bo'limni saqlash`
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  <Loader size='lg' className='mx-auto' />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  Bo'limlar mavjud emas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
        <form>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Bo'lim nomini o'zgartirish</DialogTitle>
              <DialogDescription>Bo'lim nomini kiritng</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4'>
              <div className='grid gap-3'>
                <Label htmlFor='name'>Bo'lim nomi</Label>
                <Input
                  id='name'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Bekor qilish</Button>
              </DialogClose>
              <Button
                disabled={isLoading}
                type='submit'
                onClick={handleUpdateDepartment}
              >
                {isLoading ? (
                  <>
                    <Loader size='sm' /> Bo'lim saqlanmoqda
                  </>
                ) : (
                  `Bo'limni saqlash`
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Siz mutlaqo ishonchingiz komilmi?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bu amalni ortga qaytarib bo‘lmaydi. Bu bo'limnni butunlay o'chirib
              tashlaydi va ma'lumotlaringizni serverlarimizdan olib tashlaydi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} asChild>
              <Button variant='destructive'>O'chirishni tasdiqlash</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Departments
