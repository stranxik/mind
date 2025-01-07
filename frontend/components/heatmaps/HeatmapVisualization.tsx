"use client"

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface Position {
  x: number
  y: number
  value: number
}

interface HeatmapVisualizationProps {
  positions: Position[]
}

export default function HeatmapVisualization({ positions }: HeatmapVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !positions.length) return

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    // Créer les échelles
    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([margin.left, width - margin.right])

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top])

    // Créer le terrain de football
    const field = svg.append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("fill", "#2f9e44")
      .attr("stroke", "white")

    // Ajouter les lignes du terrain
    const fieldGroup = svg.append("g")

    // Ligne médiane
    fieldGroup.append("line")
      .attr("x1", width / 2)
      .attr("y1", margin.top)
      .attr("x2", width / 2)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "white")
      .attr("stroke-width", 2)

    // Rond central
    fieldGroup.append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", Math.min(width, height) * 0.1)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2)

    // Créer la heatmap
    const heatmap = svg.append("g")

    positions.forEach(pos => {
      heatmap.append("circle")
        .attr("cx", xScale(pos.x))
        .attr("cy", yScale(pos.y))
        .attr("r", pos.value * 2)
        .attr("fill", `rgba(255, 0, 0, ${pos.value / 20})`)
        .attr("stroke", "none")
    })

    // Ajouter une légende
    const legend = svg.append("g")
      .attr("transform", `translate(${width - margin.right - 100}, ${margin.top + 10})`)

    const legendData = [5, 10, 15]
    legendData.forEach((value, i) => {
      legend.append("circle")
        .attr("cx", 0)
        .attr("cy", i * 25)
        .attr("r", value)
        .attr("fill", `rgba(255, 0, 0, ${value / 20})`)

      legend.append("text")
        .attr("x", 20)
        .attr("y", i * 25 + 5)
        .text(`Intensité ${value}`)
        .attr("fill", "white")
        .attr("font-size", "12px")
    })

  }, [positions])

  return (
    <div className="w-full aspect-[3/2] bg-green-900 relative rounded-lg overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ minHeight: "400px" }}
      />
    </div>
  )
} 