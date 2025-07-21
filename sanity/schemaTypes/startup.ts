
import { defineField, defineType } from "sanity";

export const startup=defineType({
name:"startup",
title:"Startup",
type:"document",

fields:[
        defineField({
        name:"title",
        type:"string",
    }),
    defineField({
        name:"slug",
        type:"slug",
        options:{
            source:'title'
        }
    }),

    defineField({
        name:"author",
        type:"reference",
        to:{type:"author"}
    }),
    defineField({
        name:"views",
        type:"number"
    }),
    defineField({
        name:"description",
        type:"text"
    }),
    defineField({
        name:"category",
        type:"string",
        validation:(Rule)=>Rule.required(),
    }),
    defineField({
        name:"image",
        type:"url",
        validation:(Rule)=>Rule.required(),
    }),
    defineField({
        name:"pitch",
        type:"markdown"
    }),
    defineField({
        name: "status",
        type: "string",
        title: "Fundraiser Status",
        description: "e.g. Seed, Series A, Series B, etc.",
        options: {
            list: [
                { title: "Seed", value: "Seed" },
                { title: "Series A", value: "Series A" },
                { title: "Series B", value: "Series B" },
                { title: "Series C", value: "Series C" },
                { title: "IPO", value: "IPO" },
                { title: "Bootstrapped", value: "Bootstrapped" },
            ],
        },
    }),
    defineField({
        name: "raisedAmount",
        type: "number",
        title: "Raised Amount (in USD millions)",
        description: "Total amount raised in millions (e.g. 3.99 for $3.99M)",
    }),
    defineField({
        name: "founders",
        type: "array",
        title: "Founders",
        of: [{ type: "string" }],
        description: "List of founder names",
    }),
    defineField({
        name: "website",
        type: "url",
        title: "Website",
        description: "Official website URL",
    }),
    defineField({
        name: "upvotes",
        type: "number",
        title: "Upvotes",
        initialValue: 0,
        description: "Number of upvotes",
    }),
    defineField({
        name: "fundedDate",
        type: "date",
        title: "Funded Date",
        description: "Date of most recent funding round",
    }),

],

});