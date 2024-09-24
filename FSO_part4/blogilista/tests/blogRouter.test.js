const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const api = supertest(app);
const {describe, test, after, beforeEach} = require("node:test");
const assert = require("assert");

const testBlogList = [
    {
      title: 'Pipsa possu',
      author: 'JM LATVALA',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
        title: 'CCCP',
        author: 'Rico187',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 11,
      },
      {
        title: 'Kampela',
        author: 'Rico187',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 6,
      }
  ]


beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = testBlogList.map((blog) => new Blog(blog));
    const promises = blogObjects.map((blog) => blog.save());
    await Promise.all(promises);
})

describe("GET blogs tests", () => {
    test("Returns right amount of blogs", async () => {
        const res = await api.get("/api/blogs");
        assert.strictEqual(res.body.length, 3);
    })
    test("Blogs have id field", async () => {
        const res = await api.get("/api/blogs");
        if (res.body.length === 0) assert.strictEqual(res.body.length, 0);
        const hasID = res.body.reduce((hasID, item) => item.id ? true : false, true);
        assert.strictEqual(hasID, true);
    })
})

describe("Add blog tests", () => {
    const sampleBlog = {
        title: "Saku Sammakko",
        author: "Saku Samis",
        url: "http://sakunsivu.fi/",
        likes: 2
    }

    test("Adding a blog works", async () => {
        const res1 = await api.get("/api/blogs");
        const a = res1.body.length;
        await api.post("/api/blogs").send(sampleBlog);
        const res2 = await api.get("/api/blogs");
        const b = res2.body.length
        assert.strictEqual((b - a), 1);
    })
    test("Adding a blog with no likes field", async () => {
        const result = await api.post("/api/blogs").send({
            title: "No likes blog",
            author: "Non liked author",
            url: "http://nolikes.com/"
        });
        assert.strictEqual(result.status, 201);
        assert.strictEqual(result.body.likes, 0);
    })
    
    test("Add blog with no title results in 400", async () => {
        const result = await api.post("/api/blogs").send({
            author: "Minä",
            url: "http://minäminä.fi",
            likes: 2
        })
        assert.strictEqual(result.status, 400);
    })

    test("Add blog with no url results in 400", async () => {
        const result = await api.post("/api/blogs").send({
            title: "Minun blogini",
            author: "Minä",
            likes: 2
        })
        assert.strictEqual(result.status, 400);
    })
})

describe("Deleting blog tests", () => {
    test("Deleting the first blog", async () => {
        const res = await api.get("/api/blogs");
        const blogs = res.body;
        
        await api.delete(`/api/blogs/${blogs[0].id}`);
        

        const res2 = await api.get("/api/blogs");
        const newBlogs = res2.body;

        assert.strictEqual((blogs.length - newBlogs.length), 1)
    })
    test("Deleting a invalid ID results in ERROR", async () => {
        const response = await api.delete("/api/blogs/93bogus02");
        assert.strictEqual(response.status, 400);

    })
})

describe("Updating blogs test", () => {
    test("Update an existing blog", async () => {
        const res = await api.get("/api/blogs");
        const blogToDelete = res.body[0];
        const result = await api.put("/api/blogs").send({
            ...blogToDelete,
            likes: blogToDelete.likes + 1
        })
        const res2 = await api.get("/api/blogs");
        const updatedBlog = res2.body.reduce((match, curr) => blogToDelete.id === curr.id ? curr : match, {});

        assert.strictEqual(updatedBlog.id, blogToDelete.id);
        assert.strictEqual((blogToDelete.likes + 1), updatedBlog.likes);

    })
    test("Trying to update with invalid object", async () => {
        const res = await api.get("/api/blogs");
        const blogToDelete = res.body[0];
        blogToDelete.id = "GIBBERISH";
        const result = await api.put("/api/blogs").send({
            ...blogToDelete,
            likes: blogToDelete.likes + 1
        });

        
        assert.strictEqual(result.status, 400)

    })
})

after(async () => {
    await mongoose.connection.close();
})