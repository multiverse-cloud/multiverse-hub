'use client'

import { Bell, ChevronDown, ChevronRight, Info, MoreHorizontal } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

function PreviewShell({
  children,
  compact = false,
}: {
  children: React.ReactNode
  compact?: boolean
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center overflow-hidden bg-white ${
        compact ? 'p-4 [&_*]:pointer-events-none' : 'p-6'
      }`}
    >
      <div className={`w-full ${compact ? 'max-w-[320px]' : 'max-w-[360px]'}`}>{children}</div>
    </div>
  )
}

export default function SourceUiPreview({
  previewKey,
  compact = false,
}: {
  previewKey?: string
  compact?: boolean
}) {
  switch (previewKey) {
    case 'source-button':
      return (
        <PreviewShell compact={compact}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button size="sm">Continue</Button>
            <Button size="sm" variant="outline">Preview</Button>
            <Button size="sm" variant="ghost">Skip</Button>
          </div>
        </PreviewShell>
      )
    case 'source-input':
      return (
        <PreviewShell compact={compact}>
          <Input value="hello@brand.com" readOnly />
        </PreviewShell>
      )
    case 'source-textarea':
      return (
        <PreviewShell compact={compact}>
          <Textarea readOnly value="Launching a cleaner dashboard experience for our team." className="min-h-24" />
        </PreviewShell>
      )
    case 'source-badge':
      return (
        <PreviewShell compact={compact}>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge>Pro</Badge>
            <Badge variant="secondary">New</Badge>
            <Badge variant="outline">Team</Badge>
          </div>
        </PreviewShell>
      )
    case 'source-alert':
      return (
        <PreviewShell compact={compact}>
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertTitle>Workspace synced</AlertTitle>
            <AlertDescription>Everything is ready for the next review.</AlertDescription>
          </Alert>
        </PreviewShell>
      )
    case 'source-breadcrumb':
      return (
        <PreviewShell compact={compact}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">UI</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Button</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </PreviewShell>
      )
    case 'source-card':
      return (
        <PreviewShell compact={compact}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Team overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <div>12 members online</div>
              <div className="flex items-center gap-2"><Badge variant="secondary">Updated now</Badge></div>
            </CardContent>
          </Card>
        </PreviewShell>
      )
    case 'source-accordion':
      return (
        <PreviewShell compact={compact}>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is included?</AccordionTrigger>
              <AccordionContent>Reusable primitives, source code, and previews.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </PreviewShell>
      )
    case 'source-dialog':
      return (
        <PreviewShell compact={compact}>
          <div className="mx-auto max-w-xs rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Dialog preview</div>
              <MoreHorizontal className="h-4 w-4 text-slate-400" />
            </div>
            <p className="mt-2 text-sm text-slate-500">Modal trigger and content shell from the imported dialog component.</p>
            <div className="mt-4 flex justify-end">
              <Button size="sm">Open modal</Button>
            </div>
          </div>
        </PreviewShell>
      )
    case 'source-dropdown':
      return (
        <PreviewShell compact={compact}>
          <div className="flex justify-center">
            <Button variant="outline" size="sm" className="gap-2">
              Actions <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </PreviewShell>
      )
    case 'source-select':
      return (
        <PreviewShell compact={compact}>
          <Select defaultValue="starter">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="starter">Starter</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
            </SelectContent>
          </Select>
        </PreviewShell>
      )
    case 'source-switch':
      return (
        <PreviewShell compact={compact}>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
            <div>
              <div className="text-sm font-medium">Email updates</div>
              <div className="text-xs text-slate-500">Keep sync enabled</div>
            </div>
            <Switch defaultChecked />
          </div>
        </PreviewShell>
      )
    case 'source-table':
      return (
        <PreviewShell compact={compact}>
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
              <TableRow>
                <TableCell>Orbit</TableCell>
                <TableCell>Draft</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </PreviewShell>
      )
    case 'source-tabs':
      return (
        <PreviewShell compact={compact}>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
              Live component preview
            </TabsContent>
            <TabsContent value="code" className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
              Source snippet
            </TabsContent>
          </Tabs>
        </PreviewShell>
      )
    case 'source-tooltip':
      return (
        <PreviewShell compact={compact}>
          <div className="flex justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">Hover target</Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>Quick helper text</TooltipContent>
            </Tooltip>
          </div>
        </PreviewShell>
      )
    case 'source-separator':
      return (
        <PreviewShell compact={compact}>
          <div className="space-y-3">
            <div className="text-sm font-medium">Profile settings</div>
            <Separator />
            <div className="text-sm text-slate-500">Billing access</div>
          </div>
        </PreviewShell>
      )
    case 'source-skeleton':
      return (
        <PreviewShell compact={compact}>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          </div>
        </PreviewShell>
      )
    default:
      return (
        <PreviewShell compact={compact}>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
            Imported source preview
          </div>
        </PreviewShell>
      )
  }
}
