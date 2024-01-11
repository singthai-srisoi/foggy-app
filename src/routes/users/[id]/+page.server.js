import { error } from '@sveltejs/kit'
// import { url } from 'inspector'

export const load = async ({ params }) => {
    const url = `https://jsonplaceholder.typicode.com/users?id=${params.id}`
    // console.log(url)
    const res = await fetch(url)
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