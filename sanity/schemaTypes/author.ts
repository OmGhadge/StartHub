import { UserIcon } from "lucide-react";

import { defineField, defineType } from "sanity";

export const author=defineType({
name:"author",
title:"Author",
type:"document",
icon:UserIcon,
fields:[
    defineField({
        name:"id",
        type:"number"
    }),
    defineField({
        name:"name",
        type:"string",
    }),
    defineField({
        name:"username",
        type:"string",
    }),
    defineField({
        name:"email",
        type:"string"
    }),
    defineField({
        name:"image",
        type:"url"
    }),
    defineField({
        name:"bio",
        type:"text"
    }),
    defineField({
        name: "twitter",
        type: "url",
        title: "Twitter URL",
        description: "Link to Twitter profile"
    }),
    defineField({
        name: "linkedin",
        type: "url",
        title: "LinkedIn URL",
        description: "Link to LinkedIn profile"
    }),
    defineField({
        name: "website",
        type: "url",
        title: "Personal Website",
        description: "Link to personal or portfolio website"
    }),
],
preview:{
    select:{
        title:'name'
    },
},
});