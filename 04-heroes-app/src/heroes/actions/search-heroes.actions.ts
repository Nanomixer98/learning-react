import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

interface Options {
    name?: string;
    team?: string;
    category?: string;
    universe?: string;
    status?: string;
    strength?: string;
}

export const searchHeroesAction = async (options: Options): Promise<Hero[]> => {
    const { category, name, status, strength, team, universe } = options;
    if (!name && !category && !status && !strength && !team && !universe) {
        return [];
    }

    const { data } = await heroApi.get<Hero[]>('/search', {
        params: {
            category, name, status, strength, team, universe,
        }
    })
    const heroes: Hero[] = data.map(hero => {
        return {
            ...hero,
            image: `${BASE_URL}/images/${hero.image}`
        }
    })

    return heroes;
}