export default interface IUsersResponseDTO {
    name: string;
    email: string;
    id: string;
    driver_license: string;
    avatar: string;
    avatar_url(): string;
}
