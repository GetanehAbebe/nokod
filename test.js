import server from "./index.js";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

const expect = chai.expect;
const { DEV_API_KEY } = process.env;

describe("/GET tasks", () => {
  it("it should GET all the tasks", (done) => {
    chai
      .request(server)
      .get("/api/v1/tasks")
      .set("x-api-key", DEV_API_KEY)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});
