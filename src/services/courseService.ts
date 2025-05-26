import { Course } from "../types/course";

const BASE_URL ='http://localhost:4000';

export const getCourse = async ():Promise<course[]> => {
    const response = await fetch(`${BASE_URL}/courses`);
    return await response.json();
};

export const getCourseById = async (id: string): Promise<Course |undefined> => {
    const response = await fetch(`${BASE_URL}/courses/${id}`);
    return await response.json();
};