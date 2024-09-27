import { ComponentProps } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LucideAlertCircle, LucideAlertTriangle } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
type props = ComponentProps<typeof Textarea> & {
  error: Record<string, string[]> | null
  label: string
}
new Object()
export default function InputTextArea({
  error,
  label,
  id,
  name = '',
  children,
  ...rest
}: props) {
  return (
    <div className="flex flex-col space-y-1.5 md:col-span-2 relative ">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
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
        <div className="absolute top-6 right-3 text-red-600">
          <LucideAlertTriangle />
        </div>
      )}
      {children}
    </div>
  )
}
