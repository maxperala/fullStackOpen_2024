import Blog from "./Blog";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogService from "../services/blogService";

// Tests broken as of part 7. I did not fix since the exercise did not state to do so.

const testUser = { username: "nimi", name: "nimi", token: "tokenitokeni" };

const blog = {
    title: "Testititle",
    author: "Jeppe",
    url: "http://testi.fi",
    likes: 2,
    user: testUser,
};

test("Renders title", () => {
    render(<Blog blog={blog} bs={new BlogService(testUser)} />);
    screen.getByText("Testititle by Jeppe");
});

test("Renders also likes and url when show pressed", async () => {
    const user = userEvent.setup();
    render(<Blog blog={blog} bs={new BlogService(testUser)} />);
    const btn = screen.getByText("view");
    await user.click(btn);
    screen.getByText("Testititle by Jeppe");
    screen.getByText("http://testi.fi");
    screen.getByText("likes: 2");
});

test("Like button works", async () => {
    const likeFunc = vi.fn().mockImplementation(() => Promise.resolve({}));
    const user = userEvent.setup();
    render(<Blog blog={blog} bs={new BlogService(testUser, likeFunc)} />);
    const btnView = screen.getByText("view");
    await user.click(btnView);
    const btn = screen.getByText("like");
    await user.click(btn);
    await user.click(btn);
    expect(likeFunc.mock.calls).toHaveLength(2);
});
