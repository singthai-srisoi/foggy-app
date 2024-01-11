import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
    if (res.ok) {
        const json = await res.json()
        // console.log(json)
        const data = json.map(user => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        })
        return {
            props: data
        }
    }
    
    return error(res.status, 'User not found')
    
}
