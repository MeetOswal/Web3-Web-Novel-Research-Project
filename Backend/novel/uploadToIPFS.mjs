import fs from "fs";
import { NFTStorage, File } from "nft.storage";
import fetch from "node-fetch";

let fileName;
let fileExtension;

async function storeExampleIPFS(dataName, dataExtenstion) {
  try {
    fileName = dataName;
    fileExtension = dataExtenstion;
    let fileType = fileName.split("_");
    const meta = {
      name: fileName,
      description: fileName,
      image: new File(
        [await fs.promises.readFile(`./data/default.jpg`)],
        `default.jpg`,
        { type: `image/jpg` }
      ),
      properties: {
        origins: {
          data: new File(
            [await fs.promises.readFile(`./data/${fileName}.${fileExtension}`)],
            `${fileName}.${fileExtension}`,
            { type: `${fileType[2]}/${fileType[3]}` }
          ),
        },
      },
    };
    const API = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk0QWI4MzQ5NUMwZURmNTc2ZjdiQjc4OGJDMDc4NDUxNDY5NDMyZTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDk4NzM3NzQ3MSwibmFtZSI6IlJ5dGhtTkZUIn0.vunRDt0PqRMx_866IOH4uwT-zjgQoQ5G7HSpB8HCoo8'
    let dataUrl = createMetadata(meta, API);

    fs.unlinkSync(`./data/${fileName}.${fileExtension}`);

    return dataUrl;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function createMetadata(meta, API) {
  try {
    let API_KEY = API;
    const client = new NFTStorage({ token: API_KEY });
    const metadata = await client.store(meta);
    let url_data = "";
    let url = metadata.url.replace("ipfs://", "https://ipfs.io/ipfs/");

    await fetch(url, {method: "Get"}).then(res => res.json()).then(async(json) => {

    url_data = json.properties.origins.data.replace("ipfs://", "https://ipfs.io/ipfs/");
     console.log(url_data);
    })
    return url_data;
    
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default storeExampleIPFS;