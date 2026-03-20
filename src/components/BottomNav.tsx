import { Link, useLocation } from 'wouter'
import { Home, ScanBarcode, List, MapPin, Boxes } from 'lucide-react'

const Tab = ({ to, icon: Icon, label }: any) => {
  const [loc] = useLocation()
  const active = loc === to
  return (
    <Link href={to}>
      <div className={`flex flex-col items-center gap-1 ${active ? 'text-blue-600' : 'text-gray-600'}`}>
        <Icon size={22} />
        <span className="text-xs">{label}</span>
      </div>
    </Link>
  )
}

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 h-16 bg-white border-t shadow-sm flex items-center justify-around">
      <Tab to="/" icon={Home} label="Home" />
      <Tab to="/scan" icon={ScanBarcode} label="Scan" />
      <Tab to="/inventory" icon={List} label="Inventory" />
      <Tab to="/sites" icon={MapPin} label="Sites" />
      <Tab to="/parts" icon={Boxes} label="Parts" />
    </nav>
  )
}
