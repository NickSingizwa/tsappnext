import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'

export default function Car({ car }) {

    const router = useRouter()
    const { id } = router.query
    return (
        <div className={styles.container}>
            <Head>
                <title>{car.color} {car.id}</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    {id}
                </h1>

                <img src={car.image} width="300px" />

            </main>
        </div>
    )
}

//serverside rendering

// export async function getServerSideProps({ params }) {
//     const req = await fetch(`http://localhost:3000/${params.id}.json`);
//     const data = await req.json();

//     return {
//         props: { car: data },
//     }
// }


//static rendering
export async function getStaticProps({ params }) {

    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();

    return {
        props: { car: data },
    }
}

export async function getStaticPaths() {

    const req = await fetch('http://localhost:3000/cars.json');
    const data = await req.json();

    const paths = data.map(car => {
        return { params: { id: car } }
    })

    return {
        paths,
        fallback: false
    };
}


//with naming the file to [id].server.js in next12(serverside made easy without using the above functions)

//suspense waits for async data before rendering it's children() 

{/* <Suspense fallback={<Spinner />}>
    <DynamicPage/>
</Suspense> */}