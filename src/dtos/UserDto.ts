export class UserCreationDTO {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public name: string,
        public ktp_image: string
    ) {};
}

export class UserLoginDto {
    constructor(
        public username: string,
        public password: string
    ) {};
}