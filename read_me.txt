Creating a Blog API with

** User Signup route(firstname, lastname, email, password)
**User Login route(email, password)

1. Authenticated users can create blog post
2. Users can get all published blog(whether login or logout)
3. Owner of blog can edit both the published blig or draft blog, delete it also view all its blog
4. The owner of the log should be able to get a list of their blog
a. The endpoint should be paginated
b.It should be filterable by state

Blog created must have:
a. Title
b. Description
c. Tags
d. Author
e. State(draft and published)
f. Read-time(use Algorithm for calculatting reading_time)
g. Body

Blog Features
a. A page should contain 20 blogs
b. A blog should be searchable by author, title, and Tags
c. A blog should be ordered by read_count, read_time, and timestamp
d.getById should return the author information with the blog and the read_content should be updated bt one.
