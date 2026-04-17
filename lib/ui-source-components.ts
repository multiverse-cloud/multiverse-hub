export type UiCatalogItem = {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  cssCode: string
  htmlCode: string
  previewClass: string
  previewDocument?: string
  kind?: 'generated' | 'source'
  sourcePath?: string
  usageCode?: string
  reactCode?: string
  previewKey?: string
  publishedAt?: string
  featured?: boolean
}

const source = (item: Omit<UiCatalogItem, 'kind' | 'cssCode' | 'htmlCode' | 'previewClass'>): UiCatalogItem => ({
  ...item,
  kind: 'source',
  cssCode: '',
  htmlCode: '',
  previewClass: item.id,
})

export const sourceUiComponents: UiCatalogItem[] = [
  source({
    id: 'source-button',
    title: 'Button Component',
    category: 'source-button',
    description: 'Actual button component imported from css_effects with variants, sizes, and slot support.',
    tags: ['real-source', 'button', 'shadcn', 'variants', 'interactive'],
    sourcePath: 'components/ui/button.tsx',
    previewKey: 'source-button',
    publishedAt: '2026-04-16',
    featured: true,
    usageCode: `import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <div className="flex gap-3">
      <Button>Continue</Button>
      <Button variant="outline">Secondary</Button>
      <Button variant="ghost">Skip</Button>
    </div>
  )
}`,
  }),
  source({
    id: 'source-input',
    title: 'Input Component',
    category: 'source-input',
    description: 'Actual text input component imported from css_effects with focus states and file input styling.',
    tags: ['real-source', 'input', 'form', 'field', 'shadcn'],
    sourcePath: 'components/ui/input.tsx',
    previewKey: 'source-input',
    publishedAt: '2026-04-16',
    featured: true,
    usageCode: `import { Input } from "@/components/ui/input"

export function Demo() {
  return <Input placeholder="Enter your email" />
}`,
  }),
  source({
    id: 'source-textarea',
    title: 'Textarea Component',
    category: 'source-textarea',
    description: 'Actual textarea component imported from css_effects for multi-line forms and feedback flows.',
    tags: ['real-source', 'textarea', 'form', 'multiline', 'shadcn'],
    sourcePath: 'components/ui/textarea.tsx',
    previewKey: 'source-textarea',
    publishedAt: '2026-04-16',
    usageCode: `import { Textarea } from "@/components/ui/textarea"

export function Demo() {
  return <Textarea placeholder="Tell us what you're building..." />
}`,
  }),
  source({
    id: 'source-badge',
    title: 'Badge Component',
    category: 'source-badge',
    description: 'Actual badge component imported from css_effects for labels, statuses, and small UI signals.',
    tags: ['real-source', 'badge', 'status', 'label', 'shadcn'],
    sourcePath: 'components/ui/badge.tsx',
    previewKey: 'source-badge',
    publishedAt: '2026-04-15',
    usageCode: `import { Badge } from "@/components/ui/badge"

export function Demo() {
  return (
    <div className="flex gap-2">
      <Badge>Pro</Badge>
      <Badge variant="secondary">New</Badge>
    </div>
  )
}`,
  }),
  source({
    id: 'source-alert',
    title: 'Alert Component',
    category: 'source-alert',
    description: 'Actual alert component imported from css_effects for inline notices and validation messaging.',
    tags: ['real-source', 'alert', 'feedback', 'notice', 'shadcn'],
    sourcePath: 'components/ui/alert.tsx',
    previewKey: 'source-alert',
    publishedAt: '2026-04-15',
    usageCode: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function Demo() {
  return (
    <Alert>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>Your workspace sync is active.</AlertDescription>
    </Alert>
  )
}`,
  }),
  source({
    id: 'source-breadcrumb',
    title: 'Breadcrumb Component',
    category: 'source-breadcrumb',
    description: 'Actual breadcrumb component imported from css_effects for page hierarchy and route context.',
    tags: ['real-source', 'breadcrumb', 'navigation', 'routing', 'shadcn'],
    sourcePath: 'components/ui/breadcrumb.tsx',
    previewKey: 'source-breadcrumb',
    publishedAt: '2026-04-14',
    usageCode: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function Demo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">UI</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Button</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
  }),
  source({
    id: 'source-card',
    title: 'Card Component',
    category: 'source-card',
    description: 'Actual card component imported from css_effects for surfaces, content grouping, and blocks.',
    tags: ['real-source', 'card', 'surface', 'content', 'shadcn'],
    sourcePath: 'components/ui/card.tsx',
    previewKey: 'source-card',
    publishedAt: '2026-04-16',
    featured: true,
    usageCode: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Demo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team overview</CardTitle>
      </CardHeader>
      <CardContent>12 members online</CardContent>
    </Card>
  )
}`,
  }),
  source({
    id: 'source-accordion',
    title: 'Accordion Component',
    category: 'source-accordion',
    description: 'Actual accordion component imported from css_effects for FAQs, docs, and compact content groups.',
    tags: ['real-source', 'accordion', 'faq', 'content', 'shadcn'],
    sourcePath: 'components/ui/accordion.tsx',
    previewKey: 'source-accordion',
    publishedAt: '2026-04-14',
    usageCode: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Demo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is included?</AccordionTrigger>
        <AccordionContent>Everything you need to get started.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
  }),
  source({
    id: 'source-dialog',
    title: 'Dialog Component',
    category: 'source-dialog',
    description: 'Actual dialog component imported from css_effects for modal flows and confirmation steps.',
    tags: ['real-source', 'dialog', 'modal', 'overlay', 'shadcn'],
    sourcePath: 'components/ui/dialog.tsx',
    previewKey: 'source-dialog',
    publishedAt: '2026-04-16',
    featured: true,
    usageCode: `import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}`,
  }),
  source({
    id: 'source-dropdown',
    title: 'Dropdown Menu Component',
    category: 'source-dropdown',
    description: 'Actual dropdown menu component imported from css_effects for quick actions and menus.',
    tags: ['real-source', 'dropdown', 'menu', 'actions', 'shadcn'],
    sourcePath: 'components/ui/dropdown-menu.tsx',
    previewKey: 'source-dropdown',
    publishedAt: '2026-04-14',
    usageCode: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  }),
  source({
    id: 'source-select',
    title: 'Select Component',
    category: 'source-select',
    description: 'Actual select component imported from css_effects for controlled options and input flows.',
    tags: ['real-source', 'select', 'form', 'options', 'shadcn'],
    sourcePath: 'components/ui/select.tsx',
    previewKey: 'source-select',
    publishedAt: '2026-04-16',
    usageCode: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Demo() {
  return (
    <Select defaultValue="starter">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="starter">Starter</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
  }),
  source({
    id: 'source-switch',
    title: 'Switch Component',
    category: 'source-switch',
    description: 'Actual switch component imported from css_effects for settings and preference toggles.',
    tags: ['real-source', 'switch', 'toggle', 'settings', 'shadcn'],
    sourcePath: 'components/ui/switch.tsx',
    previewKey: 'source-switch',
    publishedAt: '2026-04-15',
    usageCode: `import { Switch } from "@/components/ui/switch"

export function Demo() {
  return <Switch defaultChecked />
}`,
  }),
  source({
    id: 'source-table',
    title: 'Table Component',
    category: 'source-table',
    description: 'Actual table component imported from css_effects for admin lists, metrics, and data layouts.',
    tags: ['real-source', 'table', 'data', 'admin', 'shadcn'],
    sourcePath: 'components/ui/table.tsx',
    previewKey: 'source-table',
    publishedAt: '2026-04-14',
    usageCode: `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function Demo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Northstar</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}`,
  }),
  source({
    id: 'source-tabs',
    title: 'Tabs Component',
    category: 'source-tabs',
    description: 'Actual tabs component imported from css_effects for grouped content and compact navigation.',
    tags: ['real-source', 'tabs', 'navigation', 'content', 'shadcn'],
    sourcePath: 'components/ui/tabs.tsx',
    previewKey: 'source-tabs',
    publishedAt: '2026-04-16',
    featured: true,
    usageCode: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Demo() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">Preview content</TabsContent>
      <TabsContent value="code">Code content</TabsContent>
    </Tabs>
  )
}`,
  }),
  source({
    id: 'source-tooltip',
    title: 'Tooltip Component',
    category: 'source-tooltip',
    description: 'Actual tooltip component imported from css_effects for compact help and interface hints.',
    tags: ['real-source', 'tooltip', 'help', 'overlay', 'shadcn'],
    sourcePath: 'components/ui/tooltip.tsx',
    previewKey: 'source-tooltip',
    publishedAt: '2026-04-15',
    usageCode: `import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function Demo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Quick action</TooltipContent>
    </Tooltip>
  )
}`,
  }),
  source({
    id: 'source-separator',
    title: 'Separator Component',
    category: 'source-separator',
    description: 'Actual separator component imported from css_effects for horizontal and vertical content rhythm.',
    tags: ['real-source', 'separator', 'layout', 'divider', 'shadcn'],
    sourcePath: 'components/ui/separator.tsx',
    previewKey: 'source-separator',
    publishedAt: '2026-04-14',
    usageCode: `import { Separator } from "@/components/ui/separator"

export function Demo() {
  return (
    <div className="space-y-3">
      <div>Profile</div>
      <Separator />
      <div>Billing</div>
    </div>
  )
}`,
  }),
  source({
    id: 'source-skeleton',
    title: 'Skeleton Component',
    category: 'source-skeleton',
    description: 'Actual skeleton component imported from css_effects for loading states and content placeholders.',
    tags: ['real-source', 'skeleton', 'loading', 'placeholder', 'shadcn'],
    sourcePath: 'components/ui/skeleton.tsx',
    previewKey: 'source-skeleton',
    publishedAt: '2026-04-16',
    featured: true,
    usageCode: `import { Skeleton } from "@/components/ui/skeleton"

export function Demo() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-20 w-full" />
    </div>
  )
}`,
  }),
]
