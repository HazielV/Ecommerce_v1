'use client'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LucideArrowLeft,
  LucideCheckCircle,
  LucideX,
  LucideXCircle,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import InputGroup from '@/components/InputGroup'
import { z } from 'zod'
const passwordSchemaMin = z.string().min(6, 'Debe tener minimo 6 caracteres')
const passwordSchemaMayus = z.string().regex(/[A-Z]/, {
  message: 'Debe contener al menos una letra mayúscula',
})
const passwordSchemaNumbers = z.string().regex(/[0-9]/, {
  message: 'Debe contener al menos un numero',
})
const passwordSchema = z.string().min(6).regex(/[A-Z]/).regex(/[0-9]/)
const useDataInput = (): [
  { [key: string]: string },
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  Record<string, string[]> | null,
  React.Dispatch<React.SetStateAction<null>>
] => {
  const [data, setData] = React.useState<{ [key: string]: string }>({})
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const [errores, setErrores] = React.useState(null)

  return [data, onChangeInput, errores, setErrores]
}

const useSteaper = (): [
  number,
  () => void,
  () => void,
  { [key: string]: boolean },
  (m: number, val: boolean) => void
] => {
  const [step, setSetp] = React.useState(1)
  const [isDisabled, setDisabled] = React.useState<{ [key: string]: boolean }>(
    {}
  )
  const updataDisabled = (n: number, val: boolean) => {
    setDisabled((prev) => ({ ...prev, [`step${n}`]: val }))
  }

  const nextStep = () => {
    setSetp((prev) => {
      return prev + 1
    })
  }
  const prevStep = () => {
    setSetp((prev) => prev - 1)
  }
  return [step, nextStep, prevStep, isDisabled, updataDisabled]
}
export default function Form() {
  const formulario = React.useRef<HTMLFormElement>(null)
  const [step, nextStep, prevStep, isDisabled, updataDisabled] = useSteaper()
  const [rol, setRol] = React.useState<string | null>(null)
  const cambiarRol = (entrada: string) => {
    setRol(entrada)
  }
  const [data, onChangeInput, errores, setErrores] = useDataInput()
  const router = useRouter()
  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('rol', rol as string)
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    const response = await fetch('http://localhost:3000/api/singin', {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    })
    if (response.status >= 400) {
      // Devolvemos un error que puede ser manejado
      const error = await response.json()
      setErrores(error)
      return
    }

    const result = await response.json()
    router.push(result.redirect)
  }
  React.useEffect(() => {
    const form = formulario.current
    if (!form) return
    const formData = new FormData(form)

    // Validar que todos los campos requeridos en este paso estén completos
    const isValid = Array.from(formData.entries()).every(
      ([, value]) => (value as string).trim() !== ''
    )

    updataDisabled(step, !isValid)

    /* setIsNextEnabled(isValid) */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <form
      ref={formulario}
      onSubmit={enviar}
      className=" md:max-w-2xl w-full flex flex-col gap-10   relative justify-self-center md:col-span-2 mt-14"
    >
      <div>
        <h1 className="text-3xl font-medium"> Registro al sistema </h1>
      </div>
      {errores && (
        <div className="text-xs font-medium text-red-600">{errores['']}</div>
      )}
      {/* step 1 */}
      {step === 1 && (
        <div>
          <p className="pb-4 font-medium">Que desea hacer?</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div
              onClick={() => cambiarRol('ARTESANO')}
              className={
                'border-2 rounded-lg p-5 relative cursor-default  font-semibold ' +
                (rol === 'ARTESANO'
                  ? 'border-blue-400 bg-slate-50'
                  : 'border-gray-300 hover:bg-slate-50')
              }
            >
              <div
                className={
                  'absolute h-5 w-5 border-2 rounded-full top-2 right-2 bg-white ' +
                  (rol === 'ARTESANO'
                    ? ' border-blue-500 border-[6px]'
                    : 'border-gray-400 ')
                }
              ></div>
              <span>Artesano</span>
              <p>Quiero mostrar y vender mis artesanías únicas al mundo</p>
            </div>
            <div
              onClick={() => cambiarRol('CLIENTE')}
              className={
                'border-2 rounded-lg p-5 relative cursor-default  font-semibold ' +
                (rol === 'CLIENTE'
                  ? 'border-blue-400 bg-slate-50'
                  : 'border-gray-300 hover:bg-slate-50')
              }
            >
              <div
                className={
                  'absolute h-5 w-5 border-2 rounded-full top-2 right-2 bg-white ' +
                  (rol === 'CLIENTE'
                    ? ' border-blue-500 border-[6px]'
                    : 'border-gray-400 ')
                }
              ></div>
              <span>Cliente</span>
              <p>Quiero descubrir y comprar artesanías autenticas</p>
            </div>
            <div
              onClick={() => cambiarRol('DELIVERY')}
              className={
                'border-2 rounded-lg p-5 relative cursor-default  font-semibold ' +
                (rol === 'DELIVERY'
                  ? 'border-blue-400 bg-slate-50'
                  : 'border-gray-300 hover:bg-slate-50')
              }
            >
              <div
                className={
                  'absolute h-5 w-5 border-2 rounded-full top-2 right-2 bg-white ' +
                  (rol === 'DELIVERY'
                    ? ' border-blue-500 border-[6px]'
                    : 'border-gray-400 ')
                }
              ></div>
              <span>Delivery</span>
              <p>
                Ofrezco servicios de entrega y quiero colaborar llevando
                artesanías
              </p>
            </div>
          </div>
        </div>
      )}
      {/* step 2 */}
      {step === 2 && (
        <div className="grid md:grid-cols-2 w-full items-center gap-6 ">
          {/* <div className="flex flex-col space-y-1.5 md:col-span-2">
            <Label htmlFor="nombres">Nombres</Label>
            <Input
              className="p-3 px-4 h-auto"
              id="nombres"
              name="nombres"
              type="text"
              placeholder="Escriba sus Nombres"
            />
          </div> */}
          <InputGroup
            onChange={onChangeInput}
            value={data['nombres'] ? data['nombres'] : ''}
            error={null}
            id="nombres"
            name="nombres"
            label="Nombre(s)"
            placeholder="Escriba sus nombre(s)"
            required
          />
          <InputGroup
            onChange={onChangeInput}
            value={data['primerapellido'] ? data['primerapellido'] : ''}
            error={null}
            id="primerapellido"
            name="primerapellido"
            label="Primer apellido"
            placeholder="Escriba su Primer apellido"
            required
          />

          <InputGroup
            onChange={onChangeInput}
            value={data['segundoapellido'] ? data['segundoapellido'] : ''}
            error={null}
            id="segundoapellido"
            name="segundoapellido"
            label="Segundo apellido"
            placeholder="Escriba su Segundo apellido"
            required
          />
          <InputGroup
            onChange={onChangeInput}
            value={data['nrodocumento'] ? data['nrodocumento'] : ''}
            error={null}
            id="nrodocumento"
            name="nrodocumento"
            label="Nro. Documento"
            placeholder="Escriba su Nro. Documento"
            type="number"
            required
          />

          {rol === 'ARTESANO' && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="comunidad">Comunidad</Label>
              <Select name="comunidad" required>
                <SelectTrigger className="h-auto py-3">
                  <SelectValue placeholder="Seleccione la comunidad" />
                </SelectTrigger>
                <SelectContent className="capitalize">
                  <SelectItem value="ARTESANO">ARTESANO</SelectItem>
                  <SelectItem value="CLIENTE">CLIENTE</SelectItem>
                  <SelectItem value="DELIVERY">DELIVERY</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {rol === 'DELIVERY' && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="empresa">Empresa</Label>
              <Select name="empresa" required>
                <SelectTrigger className="h-auto py-3">
                  <SelectValue placeholder="Seleccione la empresa" />
                </SelectTrigger>
                <SelectContent className="capitalize">
                  <SelectItem value="ARTESANO">ARTESANO</SelectItem>
                  <SelectItem value="CLIENTE">CLIENTE</SelectItem>
                  <SelectItem value="DELIVERY">DELIVERY</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {/* <div className="flex flex-col space-y-1.5">
          <Label htmlFor="rol">Tipo de usuario</Label>
          <Select name="rol" required>
            <SelectTrigger className="h-auto py-3">
              <SelectValue placeholder="Seleccione el tipo de usuario" />
            </SelectTrigger>
            <SelectContent className="capitalize">
              <SelectItem value="ARTESANO">ARTESANO</SelectItem>
              <SelectItem value="CLIENTE">CLIENTE</SelectItem>
              <SelectItem value="DELIVERY">DELIVERY</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        </div>
      )}
      {step === 3 && (
        <div className="grid w-full items-center gap-6 ">
          <InputGroup
            onChange={onChangeInput}
            value={data['correoelectronico'] ? data['correoelectronico'] : ''}
            error={null}
            id="correoelectronico"
            name="correoelectronico"
            label="Correo Electronico"
            placeholder="Escriba su correo electronico"
            required
          />
          <InputGroup
            onChange={onChangeInput}
            value={data['password'] ? data['password'] : ''}
            error={null}
            id="password"
            name="password"
            label="Contraseña"
            placeholder="Escriba su constraseña"
            required
            type="password"
          >
            <div className="text-sm font-medium flex flex-col px-2 gap-1">
              <div
                className={`flex items-center gap-1 ${
                  passwordSchemaMin.safeParse(data['password']).success
                    ? 'text-emerald-600'
                    : 'text-red-600'
                }`}
              >
                {passwordSchemaMin.safeParse(data['password']).success ? (
                  <LucideCheckCircle size={17} />
                ) : (
                  <LucideXCircle size={17} />
                )}
                <span>Debe tener mínimo 6 caracteres</span>
              </div>
              <div
                className={`flex items-center gap-1 ${
                  passwordSchemaMayus.safeParse(data['password']).success
                    ? 'text-emerald-600'
                    : 'text-red-600'
                }`}
              >
                {passwordSchemaMayus.safeParse(data['password']).success ? (
                  <LucideCheckCircle size={17} />
                ) : (
                  <LucideXCircle size={17} />
                )}
                <span>Debe tener minimo 1 mayuscula</span>
              </div>
              <div
                className={`flex items-center gap-1 ${
                  passwordSchemaNumbers.safeParse(data['password']).success
                    ? 'text-emerald-600'
                    : 'text-red-600'
                }`}
              >
                {passwordSchemaNumbers.safeParse(data['password']).success ? (
                  <LucideCheckCircle size={17} />
                ) : (
                  <LucideXCircle size={17} />
                )}
                <span>Debe tener minimo 1 numero</span>
              </div>
            </div>
          </InputGroup>

          <InputGroup
            onChange={onChangeInput}
            value={data['password_confirm'] ? data['password_confirm'] : ''}
            error={null}
            id="password_confirm"
            name="password_confirm"
            label="Confirme su contraseña"
            placeholder="Vuelva a escribir su contraseña"
            required
            type="password"
          >
            <div className="text-sm font-medium flex flex-col px-2 gap-1">
              <div
                className={`flex items-center gap-1 ${
                  (data['password'] ?? '') ===
                    (data['password_confirm'] ?? '') &&
                  (data['password'] ?? '') !== ''
                    ? 'text-emerald-600'
                    : 'text-red-600'
                }`}
              >
                {(data['password'] ?? '') ===
                  (data['password_confirm'] ?? '') &&
                (data['password'] ?? '') !== '' ? (
                  <LucideCheckCircle size={17} />
                ) : (
                  <LucideXCircle size={17} />
                )}
                {(data['password'] ?? '') ===
                  (data['password_confirm'] ?? '') &&
                (data['password'] ?? '') !== '' ? (
                  <span>Las contraseñas coinciden </span>
                ) : (
                  <span>Las contraseñas no coinciden </span>
                )}
              </div>
            </div>
          </InputGroup>
        </div>
      )}
      <div className="flex flex-col  justify-end items-end ">
        {step === 1 && (
          <div className="flex w-full items-end justify-end gap-3">
            <Button
              className="mt-2 flex gap-2 pr-5  md:max-w-xs  h-auto py-3  hover:shadow-md"
              variant={'ghost'}
              type="button"
              disabled
              onClick={prevStep}
            >
              <LucideArrowLeft size={18} />
              <span>Volver</span>
            </Button>

            <Button
              className=" px-10 h-auto py-3 bg-[#065AD8] hover:bg-[#065AD8] hover:shadow-md"
              disabled={rol === null}
              type="button"
              onClick={nextStep}
            >
              Siguiente
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className="flex w-full items-end justify-end gap-3">
            <Button
              className="mt-2 flex gap-2 pr-5  md:max-w-xs  h-auto py-3 text-gray-500 hover:shadow-md"
              variant={'ghost'}
              type="button"
              onClick={prevStep}
            >
              <LucideArrowLeft size={18} />
              <span>Volver</span>
            </Button>

            <Button
              className=" px-10 h-auto py-3 bg-[#065AD8] hover:bg-[#065AD8] hover:shadow-md"
              type="button"
              disabled={isDisabled['step2'] ?? true}
              onClick={nextStep}
            >
              Siguiente
            </Button>
            {/*  <Button
              className=" px-10 h-auto py-3 bg-[#065AD8] hover:bg-[#065AD8] hover:shadow-md"
              type="submit"
            >
              Siguiente
            </Button> */}
          </div>
        )}
        {step === 3 && (
          <div className="flex w-full items-end justify-end gap-3">
            <Button
              className="mt-2 flex gap-2 pr-5  md:max-w-xs  h-auto py-3 text-gray-500 hover:shadow-md"
              variant={'ghost'}
              type="button"
              onClick={prevStep}
            >
              <LucideArrowLeft size={18} />
              <span>Volver</span>
            </Button>
            {passwordSchema.safeParse(data['password']).success &&
            (data['password'] ?? '') === (data['password_confirm'] ?? '') &&
            (data['password'] ?? '') !== '' ? (
              <Button
                className=" px-10 h-auto py-3 bg-[#065AD8] hover:bg-[#065AD8] hover:shadow-md"
                type="submit"
                disabled={isDisabled['step3'] ?? true}
              >
                Registrar
              </Button>
            ) : (
              <Button
                className=" px-10 h-auto py-3 bg-[#065AD8] hover:bg-[#065AD8] hover:shadow-md"
                type="submit"
                disabled
              >
                Registrar
              </Button>
            )}
          </div>
        )}
        <div className="self-center flex gap-1 items-center justify-center md:max-w-xs w-full absolute bottom-0">
          <div className="text-sm">ya tiene una cuenta</div>
          <Link href={'login'}>
            <Button
              type="button"
              variant={'ghost'}
              className="flex-1 px-0 h-auto py-3 focus:bg-transparent hover:bg-transparent text-sx text-[#065AD8]/90 hover:text-[#065AD8]"
            >
              Ingrese con su cuenta
            </Button>
          </Link>
        </div>
      </div>
    </form>
  )
}
