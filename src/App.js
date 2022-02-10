import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const schema = yup
  .object()
  .shape({
    title: yup.string().required(),
    teaser: yup
      .string()
      .min(20, "Teaser should be 20 characters minimum length")
      .max(100, "Teaser should be 100 characters maximum length")
      .required(),
    tags: yup.string(),
    content: yup
      .string()
      .min(300, "Content should be 300 characters minimum length")
      .max(3000, "Content should be 3000 characters maximum length"),
  })
  .required();

const App = () => {
  const [articleContent, setArticleContent] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleContentChange = (e, editor) => {
    const data = editor.getData();
    setArticleContent(data);
  };

  const onSubmit = () => console.log(articleContent);

  return (
    <div className="content">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Add new article</h1>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Article title:</Form.Label>
          <Form.Control
            placeholder="Article title"
            name="title"
            {...register("title")}
          />
          <p className="validationError">{errors.title?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTeaser">
          <Form.Label>Teaser:</Form.Label>
          <Form.Control
            placeholder="Teaser"
            name="teaser"
            {...register("teaser")}
          />
          <p className="validationError">{errors.teaser?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTags">
          <Form.Label>Tags:</Form.Label>
          <Form.Control placeholder="Tags" name="tags" {...register("tags")} />
          <p className="validationError">{errors.tags?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContent">
          <Form.Label>Content:</Form.Label>

          <div>
            <CKEditor
              editor={ClassicEditor}
              data={articleContent}
              onChange={(event, editor) => handleContentChange(event, editor)}
            />
          </div>

          <p className="validationError">{errors.content?.message}</p>
        </Form.Group>

        <div className="submitButton">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default App;
