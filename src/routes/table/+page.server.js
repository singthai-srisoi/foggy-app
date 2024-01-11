import { error } from '@sveltejs/kit';


export const load = async ({ params }) => {
    const url = `https://dummyapi.online/api/movies`
    const res = await fetch(url)
    if (res.ok) {
        const json = await res.json()
        const data = {
            props: json
        }
        return data
    }

    return error(res.status, res.text)
}