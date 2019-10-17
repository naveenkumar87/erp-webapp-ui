export class User {
	private id: number;
	private name: string;
	private username: string;
	private email: string;
	private created_at: string;
	private deleted: string;
	private password: string;
	private active: boolean;
	private updated_at: string;
	private updated_by: string;

	constructor(){}

	public setActive(active: boolean){
		this.active = active;
	}
}
