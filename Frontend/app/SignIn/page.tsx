'use client'
import { useState } from 'react'
import { signin } from '../actions/auth'
import { useActionState } from 'react'

export default function SignupForm(props: any) {
    const [formData, setFormData] = useState({ email: '', password: '' })

    const [state, action, pending] = useActionState(signin, undefined)
    const handleChange = (e: any) => {
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
      }
    return (
        <div className='flex justify-center items-center h-screen flex-col gap-4'>
                <p className='self-end text-[blue] w-[40%] underline underline-offset-8' onClick={props.onClick}>{'Sign Up'}</p>

            <form action={action}>
                <div className='flex flex-col items-center border-2 border-gray-300 gap-y-[20px] w-100 p-4 rounded-lg shadow-lg'>
                    <h1 className='text-2xl font-bold'>Sign In</h1>
                 
                    <div>
                        <label htmlFor="email" className='block mb-2'>Email</label>
                        <input id="email" name="email" value={formData.email}
              onChange={handleChange} className='border-1 h-[32px] rounded-sm w-80 px-2'  />
                        {state?.errors?.email && <p className='text-red-400'>{state.errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className='block mb-2'>Password</label>
                        <input id="password" name="password" type="password" value={formData.password}
              onChange={handleChange} className='border-1 h-[32px] rounded-sm w-80 px-2' />
                        {state?.errors?.password && (
                            <div>
                                <p>Password must:</p>
                                <ul>
                                    {state.errors.password.map((error) => (
                                        <li className='text-red-400' key={error}>- {error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <button disabled={pending} type="submit" className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400'>
                        Sign In
                    </button>
                </div>

            </form>
        </div>
    )
}