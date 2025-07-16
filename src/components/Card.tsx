'use client'
import Image from "next/image";
import styles from './Card.module.css'
import {  useState , useRef} from "react";


export type Pokemon = {
  name: string
  image: string
  description : string
  cry: string | ""
  elementalType: string
  hp: number
}

export default function Card({name, image,description, cry, elementalType, hp }: Pokemon) {

  const [isShaking , setIsShaking]= useState<boolean>(false)
  const shakeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const triggerShake = () => {
    if (shakeTimeoutRef.current){
      clearTimeout(shakeTimeoutRef.current)
    }

      // trigger
      setIsShaking(true)

      // turn it off after 1 sec
      shakeTimeoutRef.current = setTimeout(() => {
        setIsShaking(false)
      }, 1000) 
  }

function getTypeColor(type: string): string {
  switch (type.trim().toLowerCase()) {
    case "fire":
      return "bg-red-400";
    case "water":
      return "bg-blue-400";
    case "grass":
      return "bg-green-500";
    case "electric":
      return "bg-yellow-400";
    case "bug":
      return "bg-lime-600";
    default:
      return "bg-gray-200";
  }
}


  return (
    <div className={`border border-gray-100 w-50 py-2 px-2 flex flex-col justify-center items-center rounded-md bg-white shadow-lg hover:scale-105 transition hover:shadow-xl relative cursor-default
    ${isShaking ? styles.shake : ''}`}>
      <Image 
        alt="pokemon"
        src={image}
        width={100}
        height={100}
        className="mt-6"
      />
      <p className="mb-2 font-bold">{name}</p>
      <p className="text-center text-sm">{description}</p>

      <button
      className="
      w-full p-1 bg-blue-400 text-white rounded-md my-2 hover:bg-blue-500 hover:scale-95 transition cursor-pointer"
        onClick={() => {
          const audio = new Audio(cry)
          audio.volume = 0.1
          audio.play()
          triggerShake()
        }}
      >
        Play Sound
      </button>

      <span 
      className={`absolute top-2 left-3 text-xs  py-1 px-3 rounded-3xl text-white ${getTypeColor(elementalType)}`}>
        {elementalType.toUpperCase()}
      </span>
      <span
       className={`absolute top-2 right-3 text-sm`}>
      HP {hp}
      </span>
    </div>
  );
}
