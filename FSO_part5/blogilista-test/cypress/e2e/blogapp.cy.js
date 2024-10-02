import testBlogs from "../../testBlogs";

describe('Blog ', () => {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/test/reset')
    const user = {
      username: "testitaavi",
      name: "Taavi",
      password: "salis"
    }
    
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    
    

  })

  describe("Login tests", () => {
    it('Login form shown', () => {
      cy.visit('http://localhost:5173/');
      cy.contains('Login')
    })
  
    it("Login is successful", () => {
      cy.visit('http://localhost:5173/');
      cy.get('#username-field').type("testitaavi");
      cy.get('#password-field').type("salis");
      cy.get("#submit-button").click();
      cy.contains("Logged in as Taavi");
  
    })
  
    it("Login failed", () => {
      cy.visit('http://localhost:5173/');
      cy.get('#username-field').type("testitaaviz");
      cy.get('#password-field').type("salis");
      cy.get("#submit-button").click();
      cy.contains("Failed to log in")
    })
  })

  describe("When logged in", () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
      cy.get('#username-field').type("testitaavi");
      cy.get('#password-field').type("salis");
      cy.get("#submit-button").click();
    })

    it("A blog can be created", () => {
      cy.get("#show-create").click();
      cy.get("#title-input").type("Testititle");
      cy.get("#author-input").type("Seppo Kävyntähkä");
      cy.get("#url-input").type("http://testi.foo");
      cy.get("#create-button").click("");
      cy.contains("Testititle by Seppo Kävyntähkä");
    })
    describe("When blog created", () => {
      beforeEach(() => {
        cy.get("#show-create").click();
        cy.get("#title-input").type("Testititle");
        cy.get("#author-input").type("Seppo Kävyntähkä");
        cy.get("#url-input").type("http://testi.foo");
        cy.get("#create-button").click("");
      })
      it("A blog can be liked", () => {
        cy.get("#show-btn-0").click();
        cy.get("#like-div-0").contains("likes: 0");
        cy.get("#likebtn-0").click();
        cy.get("#like-div-0").contains("likes: 1")
      })
      it("A blog can be deleted by the user", () => {
        cy.contains("Testititle by Seppo Kävyntähkä");
        cy.get("#show-btn-0").click();
        cy.get("#delete-btn-0").click();
        cy.contains("Testititle by Seppo Kävyntähkä").should("not.exist");
      })

    })
    describe("Blogs made by different people", () => {
      beforeEach(() => {
        cy.request('POST', 'http://localhost:3000/test/reset')
        const user = {
        username: "testitaavi2",
        name: "Taavin veli",
        password: "salis"
        }
        cy.request('POST', 'http://localhost:3000/api/users/', user).then((resp) => {
          cy.request('POST', 'http://localhost:3000/api/login', {username: user.username, password: user.password}).then((r) => {
            const TOKEN = r.body.token;
            console.log(TOKEN);
            for (const blog of testBlogs) {
              cy.request({
                method: "POST",
                url: "http://localhost:3000/api/blogs",
                body: blog,
                headers: {
                  'Authorization': `Bearer ${TOKEN}`
                }
              })
            }
            cy.visit('http://localhost:5173/');
          })
          

        })
      })
      it("Cannot delete others blogs", () => {
        cy.get("#show-btn-0").click();
        const div = cy.get("#blog-div-0");
        div.get("delete-btn-0").should('not.exist');
      })

      it("Blogs are in order of likes", () => {
        // The blog that has most likes is added third
        cy.get("#show-btn-0").click();
        const div = cy.get("#blog-div-0");
        div.contains("Cooking with Love");
        cy.get("#show-btn-4").click();
        const div2 = cy.get("#blog-div-4");
        div2.contains("Travel Diaries");
      })

    })
  })
  
})