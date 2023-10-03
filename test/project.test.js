
import assert from 'assert';
// develop personal ethereum based blockchain on SYSTEM
import ganache from 'ganache-cli';
//wEB3 -  it is a constructor
import Web3 from 'web3';
// web3 -Instance of constructor
const web3=new Web3(ganache.provider()); 
import compile from "../compile.js";

const inter=compile.interface;
const byte=compile.bytecode;


let accounts;
let deploy_con;
let argue="hello man";

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    deploy_con = await new web3.eth.Contract(JSON.parse(inter))
      .deploy({
        data:byte,
        arguments: [argue],
      })
      .send({ from: accounts[0], gas: "1000000" });
  });
  
  describe("tEST cASES", () => {

    it("deploys a contract", () => {
         //Tests that the contract is deployed successfully to ganache
        // states ok : if address (address of contract deployed) present
      assert.ok(deploy_con.options.address)
    });

    // Assign default value to the msg variable || Read Function
    it('Msg Function' ,async() =>
    {
      const msg=await deploy_con.methods.msg().call();
      assert.equal(msg,"hello man");
    })

    // Modify data :
    it('Set data Function for updation' , async() =>
    {
      // call setData method("send new data in argue") , gas will be paid from this account
      await deploy_con.methods.setData("data renewal").send({from:accounts[0]});

      // now update data / update msg variable also
      const setmsg=await deploy_con.methods.msg().call();

      // check that msg retrieved is equal to msg ---"data renewal"
      assert.equal(setmsg,"data renewal");
    })

  });
