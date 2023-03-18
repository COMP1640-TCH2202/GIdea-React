import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const IdeaDetail = () => {
    const { hash } = useLocation();
    const commentInputEl = useRef();

    useEffect(() => {
        if (hash === "#comments") {
            commentInputEl.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            commentInputEl.current?.focus();
        }
    }, [hash]);

    return (
        <>
            <div>IdeaDetail</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque lectus nec diam sodales fringilla. Maecenas luctus nisi nulla, nec viverra dolor dictum a. Integer vitae elementum sapien, quis suscipit tellus. Pellentesque faucibus odio at erat dapibus vestibulum. Nam elementum nisi ac libero pretium, at ultrices felis scelerisque. Nulla in sem elementum, gravida magna vel, rhoncus metus. Suspendisse pharetra quam quis varius dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus nisl metus, vehicula sit amet convallis non, gravida vitae augue.

Maecenas eleifend, sapien non finibus fermentum, nunc orci lobortis ante, sit amet convallis leo nibh at diam. Nullam interdum pharetra enim, non ornare urna pellentesque sed. Maecenas consequat commodo turpis, et interdum arcu egestas at. Integer aliquet tristique elit, non luctus est interdum eget. Nunc convallis tristique diam, at sodales orci auctor et. Pellentesque vel aliquam ante. Donec non consectetur tellus. Nulla convallis neque at urna commodo viverra.

Aenean vestibulum dapibus magna vitae fringilla. Vivamus vulputate felis nec diam finibus faucibus. Fusce egestas nulla sit amet libero mattis, quis sollicitudin neque rutrum. In quis est at erat gravida tincidunt. Mauris in dignissim sem. Maecenas non porta libero. Etiam vitae velit consectetur, dapibus mauris eu, porta risus. Praesent mi nisl, ultrices blandit malesuada eget, faucibus et mi. Cras sed velit mi. Pellentesque volutpat tellus lacus, sit amet posuere mi accumsan sit amet. Phasellus id vehicula mi. Duis nisi elit, interdum ut aliquam in, aliquam a dui. Quisque pellentesque odio in velit maximus porttitor. Praesent vulputate ligula at sem vehicula porttitor.</div>
            <Form>
                <Form.Group>
                    <Form.Control ref={commentInputEl} placeholder="Express your thought on this ..." />
                </Form.Group>
            </Form>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque lectus nec diam sodales fringilla. Maecenas luctus nisi nulla, nec viverra dolor dictum a. Integer vitae elementum sapien, quis suscipit tellus. Pellentesque faucibus odio at erat dapibus vestibulum. Nam elementum nisi ac libero pretium, at ultrices felis scelerisque. Nulla in sem elementum, gravida magna vel, rhoncus metus. Suspendisse pharetra quam quis varius dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus nisl metus, vehicula sit amet convallis non, gravida vitae augue.

Maecenas eleifend, sapien non finibus fermentum, nunc orci lobortis ante, sit amet convallis leo nibh at diam. Nullam interdum pharetra enim, non ornare urna pellentesque sed. Maecenas consequat commodo turpis, et interdum arcu egestas at. Integer aliquet tristique elit, non luctus est interdum eget. Nunc convallis tristique diam, at sodales orci auctor et. Pellentesque vel aliquam ante. Donec non consectetur tellus. Nulla convallis neque at urna commodo viverra.

Aenean vestibulum dapibus magna vitae fringilla. Vivamus vulputate felis nec diam finibus faucibus. Fusce egestas nulla sit amet libero mattis, quis sollicitudin neque rutrum. In quis est at erat gravida tincidunt. Mauris in dignissim sem. Maecenas non porta libero. Etiam vitae velit consectetur, dapibus mauris eu, porta risus. Praesent mi nisl, ultrices blandit malesuada eget, faucibus et mi. Cras sed velit mi. Pellentesque volutpat tellus lacus, sit amet posuere mi accumsan sit amet. Phasellus id vehicula mi. Duis nisi elit, interdum ut aliquam in, aliquam a dui. Quisque pellentesque odio in velit maximus porttitor. Praesent vulputate ligula at sem vehicula porttitor.</div>
        </>
    );
};

export default IdeaDetail;
