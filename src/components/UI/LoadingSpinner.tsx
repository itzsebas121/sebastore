import { Loader2 } from "lucide-react"
import "./LoadingSpinner.css"

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <Loader2 size={24} className="spinner-icon" />
      <p className="loading-text">Cargando...</p>
    </div>
  )
}
