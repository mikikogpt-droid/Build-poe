import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Swords,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import heroGenerated from '../assets/generated/feral-razor-hero.png'
import { checklistItems, dashboardModules, rotationSteps } from '../data/dashboard'
import { guidePages } from '../data/guidePages'
import { guideSources } from '../data/sources'
import { skillIcons } from '../data/skillIcons'
import { AnimatedMetric } from './AnimatedMetric'
import { SourceBadge } from './SourceBadge'

type BuildDashboardProps = {
  onNavigate: (pageNumber: number | null) => void
}

const storageKey = 'poe2-feral-razor-checklist'
const laneStyle = (value: string) => ({ '--lane': value }) as CSSProperties & {
  '--lane': string
}

function readSavedChecklist() {
  try {
    const raw = window.localStorage.getItem(storageKey)
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {}
  } catch {
    return {}
  }
}

export function BuildDashboard({ onNavigate }: BuildDashboardProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(readSavedChecklist)

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(checked))
  }, [checked])

  const completed = checklistItems.filter((item) => checked[item.id]).length
  const progress = Math.round((completed / checklistItems.length) * 100)
  const coreSources = guideSources.slice(0, 12)
  const onePageSummary = guidePages.find((page) => page.pageNumber === 34)

  const sourceRefs = useMemo(
    () => ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S8', 'S12'],
    [],
  )

  const toggle = (id: string) => {
    setChecked((current) => ({ ...current, [id]: !current[id] }))
  }

  const reset = () => setChecked({})

  return (
    <motion.article
      className="dashboard"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <section className="dashboard-hero" id="module-overview">
        <div className="dashboard-hero__copy">
          <h1>Shaman Feral Razor Wolf</h1>
          <p>
            Dashboard สำหรับเล่นบิลด์จากคู่มือ PDF: โฟกัสที่ปุ่มปาด Lunar Assault,
            Freeze/Ice Fragments, Feral Invocation และการจัด Spirit ก่อนคิดจะใส่ Wolf Pack.
          </p>
          <div className="dashboard-actions">
            <a href="#module-checklist">
              <ShieldCheck size={18} />
              เช็กบิลด์ตัวเอง
            </a>
            <button type="button" onClick={() => onNavigate(34)}>
              <Sparkles size={18} />
              อ่านสรุปหน้าเดียว
            </button>
          </div>
          <div className="source-row" aria-label="Core PoE2DB references">
            {sourceRefs.map((ref) => (
              <SourceBadge key={ref} id={ref} />
            ))}
          </div>
        </div>
        <div className="dashboard-hero__art">
          <img src={heroGenerated} alt="Generated decorative Feral Razor Wolf hero art" />
          <span>Decorative generated art. Skill icons and mechanic links use PoE2DB sources.</span>
        </div>
      </section>

      <section className="module-strip" aria-label="Build modules">
        {dashboardModules.map((module) => (
          <a key={module.id} href={`#module-${module.id}`}>
            <span>{module.label}</span>
            <strong>{module.title}</strong>
          </a>
        ))}
      </section>

      <section className="metrics-grid dashboard-metrics" aria-label="Build readiness metrics">
        <AnimatedMetric label="Checklist" value={`${progress}%`} tone="spirit" amount={progress} />
        <AnimatedMetric label="Cold conversion" value="80%" tone="cold" amount={80} />
        <AnimatedMetric label="Spirit goal" value="150" tone="rage" amount={72} />
      </section>

      <section className="dashboard-panel checklist-panel" id="module-checklist">
        <div className="section-heading">
          <div>
            <h2>เช็กบิลด์ตัวเอง</h2>
            <p>ติ๊กจากของจริงในตัวละคร ไม่ใช่จากชื่อบิลด์หรือภาพจำจาก PDF.</p>
          </div>
          <button type="button" onClick={reset}>
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
        <div className="checklist-grid">
          {checklistItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={checked[item.id] ? 'is-checked' : ''}
              onClick={() => toggle(item.id)}
            >
              {checked[item.id] ? <CheckCircle2 size={22} /> : <Circle size={22} />}
              <span>
                <strong>{item.label}</strong>
                <small>{item.detail}</small>
              </span>
              <em>p.{item.pageRef}</em>
            </button>
          ))}
        </div>
      </section>

      <section className="dashboard-panel" id="module-skills">
        <div className="section-heading">
          <div>
            <h2>ชุดสกิลหลัก</h2>
            <p>เปิดจาก PoE2DB ได้ทันที และยังกลับไปอ่านหน้าอ้างอิงของ PDF ได้.</p>
          </div>
        </div>
        <div className="skill-dashboard-grid">
          {skillIcons.map((icon) => {
            const source = guideSources.find((item) => item.id === icon.sourceId)
            return (
              <a key={icon.name} href={source?.url} target="_blank" rel="noreferrer">
                <img src={icon.src} alt={`${icon.name} PoE2DB icon`} />
                <strong>{icon.name}</strong>
                <span>{source?.id}</span>
              </a>
            )
          })}
        </div>
      </section>

      <section className="dashboard-split" id="module-spirit">
        <div className="dashboard-panel">
          <div className="section-heading">
            <div>
              <h2>Spirit ก่อน Wolf Pack</h2>
              <p>
                แกนบิลด์ต้องให้ Feral Invocation, Savage Fury, Overwhelming Presence และ Herald
                of Ice ทำงานก่อน ส่วน Wolf Pack เป็น optional เมื่อ Spirit เหลือ.
              </p>
            </div>
          </div>
          <div className="spirit-lanes">
            <span style={laneStyle('80%')}>Feral Invocation</span>
            <span style={laneStyle('66%')}>Savage Fury</span>
            <span style={laneStyle('58%')}>Overwhelming Presence</span>
            <span style={laneStyle('48%')}>Herald of Ice</span>
          </div>
        </div>
        <div className="dashboard-panel" id="module-gear">
          <div className="section-heading">
            <div>
              <h2>Gear focus</h2>
              <p>Talisman two-handed melee คือหัวใจของดาเมจ ไม่ใช่ companion fantasy.</p>
            </div>
          </div>
          <div className="gear-list">
            <span>Talisman pDPS + Attack Speed</span>
            <span>Extra Cold / Freeze support</span>
            <span>Spirit, Jewels, Runic Ward package</span>
            <span>Life + capped resistance ก่อนดัน damage</span>
          </div>
        </div>
      </section>

      <section className="dashboard-panel rotation-panel" id="module-rotation">
        <div className="section-heading">
          <div>
            <h2>Rotation ที่ใช้เล่นจริง</h2>
            <p>ออกแบบให้ดูเป็นจังหวะ ไม่ต้องไล่อ่านทีละหน้าเวลาจะลองบิลด์.</p>
          </div>
          <Swords size={22} />
        </div>
        <ol>
          {rotationSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="dashboard-panel trouble-panel" id="module-trouble">
        <div className="section-heading">
          <div>
            <h2>แก้ปัญหาเร็ว</h2>
            <p>ถ้าเล่นแล้วไม่ลื่น ให้เช็กอาการเฉพาะจุดก่อนเปลี่ยนทั้งบิลด์.</p>
          </div>
        </div>
        <div>
          {dashboardModules
            .filter((module) => ['trouble', 'rotation', 'gear', 'spirit'].includes(module.id))
            .map((module) => (
              <button key={module.id} type="button" onClick={() => onNavigate(module.pageRefs[0])}>
                <strong>{module.title}</strong>
                <span>{module.summary}</span>
                <em>เปิดหน้า {module.pageRefs.join(', ')}</em>
              </button>
            ))}
        </div>
      </section>

      <section className="dashboard-panel reference-panel" id="module-sources">
        <div className="section-heading">
          <div>
            <h2>Reference drawer</h2>
            <p>
              หน้า PDF ทั้ง 35 หน้ายังอยู่ครบ แต่ถูกย้ายมาเป็น evidence/reference แทนการเป็น
              navigation หลักของแอป.
            </p>
          </div>
          <button type="button" onClick={() => onNavigate(1)}>
            เปิดหน้า 1
          </button>
        </div>
        <div className="reference-grid">
          {dashboardModules.map((module) => (
            <div key={module.id}>
              <strong>{module.title}</strong>
              <p>{module.summary}</p>
              <div>
                {module.pageRefs.map((pageNumber) => (
                  <button key={pageNumber} type="button" onClick={() => onNavigate(pageNumber)}>
                    p.{pageNumber}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="source-callout">
        <div>
          <h2>PoE2DB only</h2>
          <p>
            ตัวเลข/mechanic ที่เสริมจาก PDF ต้องย้อนกลับไปยัง PoE2DB ได้เสมอ.
            ภาพ hero เป็นภาพตกแต่งที่ generated ไม่ใช่ icon หรือข้อมูลเกมทางการ.
          </p>
        </div>
        <div>
          {coreSources.map((source) => (
            <a key={source.id} href={source.url} target="_blank" rel="noreferrer">
              <span>{source.id}</span>
              {source.label}
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      </section>

      {onePageSummary && (
        <section className="dashboard-panel one-page-panel">
          <div className="section-heading">
            <div>
              <h2>สรุปหน้าเดียวจาก PDF</h2>
              <p>ใช้เป็นทางลัดไปยังหน้าสรุป โดยไม่ตัด reference เดิมทิ้ง.</p>
            </div>
            <button type="button" onClick={() => onNavigate(onePageSummary.pageNumber)}>
              เปิด p.{onePageSummary.pageNumber}
            </button>
          </div>
        </section>
      )}
    </motion.article>
  )
}
