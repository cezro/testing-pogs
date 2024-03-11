import supertest from "supertest";
import { app, pool } from "../server";

let id = "";
describe("Pogs API Testing", () => {
  beforeEach(async () => {
    const response = await pool.query(`
        INSERT INTO pogs (name, ticker_symbol, price, color)
        VALUES 
        ('blue eyes white dragon', 'BEWD', '9929', 'cyan')
        RETURNING id
        `);
    id = response.rows[0].id;
    console.log("supposedly the id", response.rows[0].id);
  });
  afterEach(async () => {
    const response = await pool.query(`
    DELETE FROM pogs 
    WHERE name = 'blue eyes white dragon';
    `);
  });

  describe("Fetch all pogs", () => {
    it("Should fetch all pogs", async () => {
      const response = await supertest(app).get("/api/pogs");

      expect(response.statusCode).toBe(200);
    });

    describe("Fetch pog through id", () => {
      it("Should fetch pog through id", async () => {
        const response = await supertest(app).get(`/api/pogs/${id}`);
      });
    });
    describe("Create a pog", () => {
      it("Should create test pog", async () => {
        const testPog = {
          name: "dark magician",
          ticker_symbol: "DM",
          color: 420,
        };
        const response = await supertest(app)
          .put(`/api/pogs/${id}`)
          .send(testPog)
          .set("Accept", "application/json");

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(id);
      });
    });

    describe("Delete a pog through id", () => {
      it("Should delete a pog through id", async () => {
        const response = await supertest(app).delete(`/api/pogs/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Pogs deleted successfully");
      });
    });
  });
});
