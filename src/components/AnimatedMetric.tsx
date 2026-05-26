import { motion, useReducedMotion } from 'framer-motion'

type AnimatedMetricProps = {
  label: string
  value: string
  tone: 'cold' | 'rage' | 'spirit'
  amount: number
}

export function AnimatedMetric({
  label,
  value,
  tone,
  amount,
}: AnimatedMetricProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={`metric metric--${tone}`}>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="metric__track" aria-hidden="true">
        <motion.span
          initial={{ width: reduceMotion ? `${amount}%` : '8%' }}
          animate={{ width: `${amount}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
