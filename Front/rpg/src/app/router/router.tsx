'use server'
 
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
 
export async function changePage(url: string) { 
 
  revalidatePath(`/${url}`)
  redirect(`/${url}`) 
}