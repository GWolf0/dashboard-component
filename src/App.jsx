import Dashboard from "./components/Dashboard";
import dashboardSettings from "./dashboardSettings";
import DBIconButton from "./components/DBIconButton";
import DBPopupButton from "./components/DBPopupButton";
import DBService from "./services/DBService";

function App(){
  const colors=dashboardSettings.colors;

  return (
    <div className="App">
      <Dashboard
        sideBarBgColor={"bg-gradient-to-b from-dark via-darker to-darkprimary"}
        sections={
          [
            {
              title:'Section 1',
              icon:<i className="bi-alarm"></i>,
              component:<div className="pb-12">
                <div className="aspect-video bg-darker rounded-lg" style={{maxWidth:'1080px'}}>
                  <p className="text-xl md:text-5xl text-left pt-16 px-6 text-lighter">Some Content..</p>
                </div>
                <p className="mt-8 text-dark">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione natus quia est odit quis, nisi veniam quibusdam temporibus perspiciatis iure? Mollitia veritatis architecto accusantium consequatur ab quaerat eum, incidunt numquam?
                  Voluptates esse, ipsam veniam exercitationem vero doloremque molestiae tempora fuga aspernatur iste animi earum nam aliquid ea voluptatem autem at odit fugit repellendus. Illo perspiciatis ipsum consectetur asperiores, quos quibusdam.
                  Non omnis, voluptatum earum distinctio doloremque et adipisci veniam facilis quidem modi! Dolor dignissimos, magni, debitis rem dicta asperiores dolore cumque omnis facere magnam labore ad rerum, aspernatur praesentium libero.
                  Fugit nihil nam distinctio consectetur deserunt sunt? Beatae, non atque sequi magnam sunt dignissimos nostrum voluptatum, mollitia excepturi repellat delectus consectetur illo illum iste aperiam, quisquam officiis reprehenderit eligendi doloremque.
                  Nam, distinctio. Magnam, similique quisquam excepturi rerum ducimus possimus ex quo quod eaque dicta debitis eum repellendus in sequi officiis aspernatur minima qui repudiandae hic commodi. Nulla temporibus perferendis fuga!
                  Non beatae, vel asperiores ipsam soluta iusto facilis aspernatur magnam excepturi. Consectetur doloribus est ipsam incidunt esse iure, quibusdam reiciendis ex laboriosam obcaecati nobis fuga vero dolorum ipsum veniam optio!
                  Nesciunt vero necessitatibus quos ipsa fugit blanditiis quasi, perferendis, adipisci accusamus aliquid, aut laborum ut doloremque facilis quas praesentium tempora ipsam veniam! Sunt libero, doloribus quisquam exercitationem porro rem ducimus.
                  Adipisci voluptatum voluptatibus, soluta cum eaque ipsam laborum officia, saepe consectetur, voluptatem illum aperiam. Suscipit quae sit aperiam minima reiciendis, voluptate illo ducimus inventore qui quisquam, totam iste nesciunt maxime.
                  Nisi omnis adipisci quas dolore sed dolores voluptatum, sunt tempore non deserunt ipsum labore ducimus dignissimos soluta sit amet facilis ex officia consectetur magni incidunt excepturi cumque odio est. Quibusdam?
                  Neque, nam. Maiores tempore, deleniti voluptate id aut provident velit perferendis aspernatur facere eveniet dignissimos asperiores quia sequi quas, impedit, consectetur delectus atque ut laudantium suscipit totam porro natus hic.
                  Ipsa, neque temporibus nam voluptatibus, cumque deleniti tempore harum numquam, odio earum voluptate est repudiandae dignissimos suscipit? Omnis itaque nihil ab, asperiores assumenda fuga harum. Vitae dolor dignissimos ratione est?
                  Facere dicta veritatis, consequuntur inventore quibusdam corrupti esse minima ducimus provident iste optio eos itaque enim voluptatum velit sunt quos aspernatur, eius asperiores voluptatibus laborum ratione voluptas rerum? Explicabo, repellendus.
                  Officiis harum obcaecati ex maxime minus! Adipisci ipsa possimus natus architecto dolorum repellat reiciendis. Possimus, itaque, accusantium, nulla accusamus ratione cum soluta sint eaque blanditiis eum facilis dolorum sit perferendis?
                  Officiis quidem, optio eos eveniet voluptatem ratione rem asperiores itaque earum, deleniti nemo facilis dolorum aspernatur recusandae, cupiditate libero ipsam velit. Recusandae cupiditate iste nesciunt in dolore qui, numquam beatae!
                  Expedita delectus possimus modi. Ipsum architecto natus deleniti nisi possimus neque, sunt quisquam quam iste recusandae reprehenderit at harum quibusdam nam dolorem ad, dignissimos tempora necessitatibus perferendis alias labore? Placeat!
                </p>
              </div>,
            },
            {
              title:'Section 2',
              icon:<i className="bi-alarm"></i>,
              component:<p>Section 2 content.</p>,
            }
          ]
        }
        headerActions={[
          <DBIconButton onClick={()=>DBService.showSnackbar({message:'This is a test snackbar!'})} label="Test" icon={<i className="bi-play"></i>} bgColor={colors.primary} textColor={colors.lighter} height="32px" radius="7px" padding="0 1rem" fontSize={"0.75rem"} />,
          <DBPopupButton bgColor={colors.lightest} icon={<i className="bi-person"></i>} actions={[
            {label:'Action1',onClick:()=>{
                DBService.showConfirmDialog({message:"Another test confirm dialog!"})
                .then(val=>console.log("Confirm dialog response",val))
                .catch(e=>console.log("Confirm dialog error",e));
              }
            },
            {label:'Action2',onClick:()=>{
                DBService.showAlertDialog({message:'Another alert dialog test!'})
              }
            }
          ]} />
        ]}
        footerLinks={[
          <a className="py-2 px-4 text-dark hover:text-accent" href="#">Link One</a>,
          <a className="py-2 px-4 text-dark hover:text-accent" href="#">Link Two</a>,
          <a className="py-2 px-4 text-dark hover:text-accent" href="#">Link Three</a>
        ]}
      />
    </div>
  )
}

export default App;
