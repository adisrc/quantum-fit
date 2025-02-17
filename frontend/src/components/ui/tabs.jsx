import { useState } from 'react'

export function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  
  const tabs = children.filter(child => child.type === TabsList)[0]
  const content = children.filter(child => child.type === TabsContent)
  
  return (
    <div>
      {tabs && React.cloneElement(tabs, { activeTab, setActiveTab })}
      {content.find(child => child.props.value === activeTab)}
    </div>
  )
}

export function TabsList({ children, activeTab, setActiveTab }) {
  return (
    <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
      {React.Children.map(children, child =>
        React.cloneElement(child, { 
          active: child.props.value === activeTab,
          onClick: () => setActiveTab(child.props.value)
        })
      )}
    </div>
  )
}

export function TabsTrigger({ value, active, children, onClick }) {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        active ? "bg-background text-foreground shadow-sm" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children }) {
  return <div>{children}</div>
}