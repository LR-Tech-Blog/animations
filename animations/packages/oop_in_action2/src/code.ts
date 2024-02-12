export const animalClass: string = `public abstract class Animal {
    private String nome;

    public Animal(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }

    public abstract void fazerBarulho();
}`

export const aveClass: string = `public abstract class Ave extends Animal {
    public boolean podeVoar;
    public Ave(String nome, boolean podeVoar) {
        super(nome);
        this.podeVoar = podeVoar;
    }
}`

export const aveClassBody: string = `
    public boolean podeVoar;
    public Ave(String nome, boolean podeVoar) {
        super(nome);
        this.podeVoar = podeVoar;
    }
`

export const aveClassDeclaration: string = `public abstract class Ave extends Animal {...}`

export const galinhasClass: string = `public class Galinha extends Ave {
    public Galinha() {
        super("Galinha", false);
    }

    @Override
    public void fazerBarulho() {
        System.out.println("Co Co");
    }
}`

export const galinhaClassDeclaration: string = `public class Galinha extends Ave {...}`
export const galinhaClassBody: string = `
    public Galinha() {
        super("Galinha", false);
    }

    @Override
    public void fazerBarulho() {
        System.out.println("Co Co");
    }
`