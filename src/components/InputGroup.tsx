import { ComponentProps } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LucideAlertCircle, LucideAlertTriangle } from 'lucide-react'
type props = ComponentProps<typeof Input> & {
  error: Record<string, string[]> | null
  label: string
}
new Object()
export default function InputGroup({
  error,
  label,
  id,
  name = '',
  children,
  className,
  ...rest
}: props) {
  return (
    <div className={'flex flex-col space-y-1.5 relative ' + className}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        {...rest}
        name={name}
        className="p-3 px-4 h-auto"
        id={id}
        /* placeholder="Escriba sus Nombres" */
      />
      {error && error[name] && (
        <div className="text-xs absolute -bottom-4 font-semibold text-red-600 first-letter:capitalize  right-0">
          {error[name][0]}
        </div>
      )}
      {error && error[name] && (
        <div className="absolute bottom-3 right-3 text-red-600">
          <LucideAlertTriangle />
        </div>
      )}
      {children}
    </div>
  )
}
