import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

import { db } from '../config/firebase'

const booksCollection = collection(db, 'libros')

function normalizeBook(document) {
  const data = document.data()

  return {
    id: document.id,
    title: data.title ?? '',
    author: data.author ?? '',
    year: Number(data.year ?? 0),
    genre: data.genre ?? '',
    rating: Number(data.rating ?? 0),
    favorite: Boolean(data.favorite),
    description: data.description ?? '',
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  }
}

export async function obtenerTodos() {
  const booksQuery = query(booksCollection, orderBy('title'))
  const snapshot = await getDocs(booksQuery)

  return snapshot.docs.map(normalizeBook)
}

export async function obtenerPorId(id) {
  const reference = doc(db, 'libros', id)
  const snapshot = await getDoc(reference)

  if (!snapshot.exists()) {
    return null
  }

  return normalizeBook(snapshot)
}

export async function crear(book) {
  const reference = await addDoc(booksCollection, {
    ...book,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return {
    id: reference.id,
    ...book,
  }
}

export async function actualizar(id, book) {
  const reference = doc(db, 'libros', id)

  await updateDoc(reference, {
    ...book,
    updatedAt: serverTimestamp(),
  })

  return {
    id,
    ...book,
  }
}

export async function eliminar(id) {
  const reference = doc(db, 'libros', id)

  await deleteDoc(reference)
}

export async function cambiarEstado(id, favorite) {
  const reference = doc(db, 'libros', id)

  await updateDoc(reference, {
    favorite,
    updatedAt: serverTimestamp(),
  })
}