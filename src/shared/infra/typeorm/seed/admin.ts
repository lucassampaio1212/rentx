import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license ,created_at)
      values('${id}', 'maicao', 'maicao@rentx.com.br', '${password}', true, 'XXX-1234' , 'now()')
    `
    );

    await connection.close();
}

create().then(() => console.log("User admin created!"));
