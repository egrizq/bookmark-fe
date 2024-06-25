import { z } from 'zod';

// todo login 

export const schemaLogin = z.object({
    username: z.string().min(8),
    password: z.string().min(8)
})

export type FormFieldslogin = z.infer<typeof schemaLogin>;

// todo add category

export const schemaCategory = z.object({
    newcategory: z.string().min(2, { message: "Setidaknya 2 karakter untuk penamaan" })
})

export type FormFieldsCategory = z.infer<typeof schemaCategory>;

// todo signup 

export const schemaSignUp = z.object({
    username: z.string().min(8),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConf: z.string().min(8),
}).refine((data) => data.password === data.passwordConf, {
    message: "Password don't match",
    path: ["passwordConf"]
})

export type FormFieldsSignUp = z.infer<typeof schemaSignUp>;

export interface bodyRequest {
    username: string,
    email: string,
    password: string,
}

// todo response

export interface response {
    StatusCode: number,
    Message: string
}

// todo add bookmarks

export interface requestBookmarks {
    social: string
    url: string
    category: string
}

// todo url

export interface typeURL {
    url: string
}

