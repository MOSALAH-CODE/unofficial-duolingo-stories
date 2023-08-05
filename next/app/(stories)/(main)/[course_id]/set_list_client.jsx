'use client'
import styles from "./set_list.module.css"
import StoryButton from "./story_button";
import {useEffect, useState} from "react";


export default function SetListClient({course_id, course}) {
    const [done, setDone] = useState({});

    console.log("SetListClient")
    useEffect(async () => {
        console.log(`${course_id}/get_done`)
        let res = await fetch(`${course_id}/get_done`, {credentials: 'include'});
        console.log("res")
        let done = await res.json();
        console.log("json", done)
        setDone(done);
    }, []);

    return <div className={styles.story_list}>
        {course.about ?
            <div className={styles.set_list}>
                <div className={styles.set_title}>About</div><p>
                {course.about}
            </p>
            </div>
            : <></>}
        {course.sets.map(set => (
            <div key={set[0].set_id} className={styles.set_list}>
                <div className={styles.set_title}>Set {set[0].set_id}</div>
                {set.map(story => (
                    <StoryButton key={story.id} story={story} done={done[story.id]} />
                ))}
            </div>
        ))}
    </div>
}
