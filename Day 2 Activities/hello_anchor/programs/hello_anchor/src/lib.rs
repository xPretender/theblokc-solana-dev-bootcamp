use anchor_lang::prelude::*;

declare_id!("Cb8qWGvvf8WVtwkUXwmmcYKcQH4fpr6D4oD56h58ttpA");

#[program]
pub mod hello_anchor {
    use super::*;

    pub fn add_message(ctx: Context<AddMessage>,msg:String) -> Result<()> {
        let message_account = &mut ctx.accounts.message_account;
        message_account.msg = msg;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct AddMessage <'info>{
    #[account(init,payer=signer,space=8+std::mem::size_of::<MessageAccount>())]
    pub message_account: Account<'info, MessageAccount>,
    #[account(mut)]
    pub signer:Signer<'info>,
    pub system_program : Program<'info, System>,
}

#[account]
pub struct MessageAccount {
    msg: String,
}